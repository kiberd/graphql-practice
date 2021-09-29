import "./App.css";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { useState } from "react";

import SearchRepo from "./SearchRepo";
import SearchResult from "./SearchResult";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';


const REPOSITORY_INFO = gql`
query repository($keyword: String!, $length: Int!
                 $name: Boolean!, $owner: Boolean!, $homepageUrl: Boolean!, $description: Boolean! 
                 $createdAt: Boolean!, $diskUsage: Boolean!, $forkCount: Boolean!, $issues: Boolean!, $assignableUsers: Boolean! ) {
  search(query: $keyword, type: REPOSITORY, first: $length) {
     edges {
       node {
         ... on Repository { 
           name @include(if: $name)
           owner @include(if: $owner){
             login            
           }
           homepageUrl @include(if: $homepageUrl)
           description @include(if: $description)
           createdAt @include(if: $createdAt)
           diskUsage @include(if: $diskUsage)
           forkCount @include(if: $forkCount)
           issues(first:10) @include(if: $issues){
             edges{
               node{
                 number
                 author{
                   login
                 }
                 body
                 bodyUrl
                 closed
                 closedAt
               }
             }
           }
           assignableUsers(first:10) @include(if: $assignableUsers){
             edges{
               node{
                 login
               }
             }
           }
         }
       }
     }
   }
 }
`;

const USER_INFO = gql`
{
  search(query: "javascript", type:REPOSITORY, first: 50) {
    edges {
      node {
         ... on User {
          login
          email
          location
          avatarUrl
          createdAt
          issues(first:10){
            edges{
              node{
                number
                url
              }
            }
          }
        }
      }
    }
  }
}

`;


function App() {
  
  const [keyword, setKeyword] = useState();
  const [result, setResult] = useState();

  const [list, setList] = useState({
    name: true,
    owner: true,
    homepageUrl: true,
    description: true,
    createdAt: true,
    diskUsage: true,
    forkCount: true,
    issues: true,
    assignableUsers: true
  });

  const handleCheckChange = (name, checked) => {

    setList({
      ...list,
      [name]: checked,
    });
  };

  const handleKeywordChange = (keyword) => {
    setKeyword(keyword);
  };


  const [getRepo, { loading, error, data }] = useLazyQuery(REPOSITORY_INFO, {
    onCompleted: (data) => {
      setResult(data.search.edges);
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <SearchRepo onHandleCheckChange={handleCheckChange} onHandleKeywordChange={handleKeywordChange} list={list}></SearchRepo>
          <Button onClick={() => getRepo({
            variables: {
              keyword: keyword,
              length: 10,
              name: list.name,
              owner: list.owner,
              homepageUrl: list.homepageUrl,
              description: list.description,
              createdAt: list.createdAt,
              diskUsage: list.diskUsage,
              forkCount: list.forkCount,
              issues: list.issues,
              assignableUsers: list.assignableUsers
            }
          })} variant="contained" >Search</Button>
        </Grid>
        <Grid item xs={8}>
          <SearchResult result={result}></SearchResult>
        </Grid>
      </Grid>


    </div>
  );
}

export default App;
