import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './Navbar';

const InventoryEdit = () => {
  const { id } = useParams(); // Hook to get route parameter
  const navigate = useNavigate(); // Hook to navigate programmatically

  const emptyInventory = {
    title: '',
    author: '',
  };

  const [item, setItem] = useState(emptyInventory); // State hook for inventory item

  // Fetch inventory data if editing an existing item
  useEffect(() => {
    const fetchInventory = async () => {
      if (id !== 'new') {
        // Use relative path
        const response = await fetch(`/api/inventory/${id}`);
        const inventory = await response.json();
        setItem(inventory);
      }
    };
    fetchInventory();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch('/api/inventory', {
      method: item._id ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    navigate('/inventories'); // Use 'navigate' after form submission
  };

  const page_title = (
    <h2 className="mt-3">
      {item._id ? 'Edit Book' : 'Add Book'}
    </h2>
  );

  return (
    <div>
      <AppNavbar />
      <Container>
        {page_title}
        <Form onSubmit={handleSubmit}>

          <FormGroup>
            <Label for="title" className="h5 mt-3">Book Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              value={item.title || ''}
              onChange={handleChange}
              autoComplete="title"
            />
          </FormGroup>

          <FormGroup>
            <Label for="author" className="h5 mt-3">Author</Label>
            <Input
              type="text"
              name="author"
              id="author"
              value={item.author || ''}
              onChange={handleChange}
              autoComplete="author"
            />
          </FormGroup>

          <FormGroup>
            <Button color="primary" type="submit" className="mt-3">Save</Button>{' '}
            <Button
              color="secondary"
              className="mt-3"
              tag={Link}
              to="/inventories"
            >
              Cancel
            </Button>
          </FormGroup>

        </Form>
      </Container>
    </div>
  );
};

export default InventoryEdit;

