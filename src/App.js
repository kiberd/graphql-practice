import logo from "./logo.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

const COMMIT_HISTORY = gql`
  query {
    repository(owner: "kiberd", name: "movie-app") {
      url
      createdAt
      pushedAt
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 10) {
              edges {
                node {
                  oid
                  committedDate
                  author {
                    name
                  }
                  messageHeadline
                  commitUrl
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
  console.log(data.repository.defaultBranchRef.target.history.edges);

  const commits = data.repository.defaultBranchRef.target.history.edges;

  return (
    <div>
       {data
          ? commits.map((commit) => {
             <div>{commit.node.commitUrl}</div>
            })
          : null}
    </div>
  );
}

export default App;
