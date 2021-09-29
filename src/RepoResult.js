import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function RepoResult(props) {

    const repo = props.repo.node;

    let assignableUsers = '';
    
    if(typeof repo.assignableUsers !== 'undefined'){
        repo.assignableUsers.edges.map((edge, index) => {
        if (index + 1 === repo.assignableUsers.edges.length) {
            assignableUsers += edge.node.login;
        }
        else {
            assignableUsers += edge.node.login + ', ';
        }
    });
    }
    

    let issues = [];

    if(typeof repo.issues !== 'undefined'){
        repo.issues.edges.map((edge, index) => {
            issues.push(edge.node.bodyUrl);
        });
    }
    

    return (
        <div style={{ marginTop: '5px' }}>
            <Card>
                <CardContent>
                    {repo.__typename ? <div><b>Type</b> : {repo.__typename}</div> : null}
                    {repo.name ? <div><b>Name</b> : {repo.name}</div> : null}
                    {repo.owner ? <div><b>Owner</b> : {repo.owner.login}</div> : null}
                    {repo.homepageUrl ? <div><b>URL</b> : <a href={repo.homepageUrl}>{repo.homepageUrl}</a></div> : null}
                    {repo.description ? <div><b>Description</b> : {repo.description}</div> : null}
                    {repo.createdAt ? <div><b>Created Date</b> : {repo.createdAt}</div> : null}
                    {repo.forkCount ? <div><b>ForkCount</b> : {repo.forkCount}</div> : null}
                    {repo.assignableUsers ? <div><b>AssignableUsers</b> : {assignableUsers}</div> : null}
                    {repo.issues ? <div><b>Issues : {issues.map((issue) => ( <div><a href={issue}>{ issue }</a></div>))}</b></div> : null }
                </CardContent>
            </Card>
        </div>

    )
}

export default RepoResult;