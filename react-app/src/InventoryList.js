import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './Navbar';
import { Link } from 'react-router-dom';

class InventoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventories: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch('api/inventories')
            .then(response => response.json())
            .then(data => this.setState({ inventories: data, isLoading: false })) ;

    }

    removeInventory = async (id) => {
        await fetch(`api/inventory/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        console.log("Remove Done!");
        // Update inventory state minus removed item
        let updatedInventories = 
            [...this.state.inventories].filter(i => i._id !== id);
        this.setState({ inventories: updatedInventories });
    }

    render() {
        const { inventories, isLoading } = this.state; 

        if (isLoading) {
            return <p>Loading...</p>;
        }

        console.log(inventories);

        const inventoryList = inventories.map(inventory => {

            return (
                <tr key={inventory._id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{inventory.title}</td>
                    <td>{inventory.author}</td>
                    <td>
                    <ButtonGroup>
                        <Button
                            size="sm"
                            color="info"
                            tag={Link} 
                            to={"/inventories/" + inventory._id}
                        >
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            color="warning"
                            onClick={() => this.removeInventory(inventory._id)} 
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
            );
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button
                            color="primary"
                            className="my-4"
                            tag={Link}
                            to="/inventories/new"
                        >
                            Add Book
                        </Button>
                    </div>
                    <h3>Book List</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Book Title</th>
                                <th width="15%">Author</th>
                                <th width="15%">Actions</th>
                            </tr>
                        </thead> 
                        <tbody>
                            {inventoryList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default InventoryList;
