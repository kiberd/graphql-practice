import "./App.css";
import { useQuery, gql } from "@apollo/client";

const REPOSITORY_INFO = gql`
{
  search(query: "javascript", type:REPOSITORY, first: 50) {
    edges {
      node {
        ... on Repository { 
          name
          owner{
            login            
          }
          homepageUrl
          description
          createdAt
          diskUsage
          forkCount
          issues(first:10){
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
          assignableUsers(first:10){
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
  const { loading, error, data } = useQuery(COMMIT_HISTORY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // let commits;
  // if(data){
  //   commits = data.repository.defaultBranchRef.target.history.edges.node;
  //   console.log(commits);
  // }

  console.log(data);
  

  return (
    <div>
      dddd
    </div>
  );
}

export default App;
