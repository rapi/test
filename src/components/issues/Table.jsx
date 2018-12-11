import React,{ Component } from 'react';
import { 
  Icon, 
  Table,
  Loader,
  Container,
  Dimmer 
} from 'semantic-ui-react'

class App extends Component {
  state={
    page:1,
    loading:true,
    data:[]
  }
  /**
   * fetch json from api.github.com with issues of facebook
   * @param number page
   */
  fetch(page){
    this.setState({
      ...this.state,
      page:page,
      loading:true
    })
    fetch('https://api.github.com/repos/facebook/react/issues?page='+page)
      .then(e=>e.json())
      .then(e=>{
        this.setState({
          ...this.state,
          loading:false,
          //Filter fields for saving space in state
          data:this.state.data.concat(e.map(el=>({
            number:el.number,
            title:el.title,
            updated_at:el.updated_at,
            created_at:el.created_at,
            //we need just label names
            labels:el.labels.map(label=>label.name),
            state:el.state
          })))
        })
      })
  }
  componentDidMount(){
    //Fetch first page
    this.fetch(1)
  }
  render() {
    if(this.state.loading && this.state.page===1) return <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>;
    return  <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Issue Number</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Created At</Table.HeaderCell>
            <Table.HeaderCell>Updated At</Table.HeaderCell>
            <Table.HeaderCell>Labels</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {this.state.data.map(issue=>
            <Table.Row key={issue.number}>
                <Table.Cell>{issue.number}</Table.Cell>
                <Table.Cell>{issue.title}</Table.Cell>
                <Table.Cell>{issue.created_at}</Table.Cell>
                <Table.Cell>{issue.updated_at}</Table.Cell>
                <Table.Cell>{issue.labels.join(', ')}</Table.Cell>
                <Table.Cell>{issue.state}</Table.Cell>
            </Table.Row>
            )}
        </Table.Body>
    </Table>
    <Container textAlign='center'>
      { //on loading hide more button
        this.state.loading
        ?<Loader active inline='centered' />
        :<a href={'#'+(this.state.page+1)} onClick={()=>this.fetch(this.state.page+1)}>
          <Icon name='chevron circle down' />
        </a>
      }
    </Container>
  </>
  }
}
export default App;
