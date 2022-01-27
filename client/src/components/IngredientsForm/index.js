import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_INGREDIENT } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';

const IngredientsForm = () => {
    const [ingredientFormData, setIngredientFormData] = useState({ ingredient: ''});

    const [searchedIngredients, setSearchedIngredients] = useState([]);

    const [ingredientInput, setIngredientInput] = useState('');

    const [validated] = useState(false);

    const [addIngredient, { error }] = useMutation(ADD_INGREDIENT);
    
    const userIngredientsLength = Object.keys(IngredientsData).length;

    const handleAddIngredient = async (name) => {
        const ingredientToSave = {ingredientInput}

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await addIngredient({
                variables: { newIngredient: { ...ingredientToSave } },
            });
        } catch (err) {
            console.error(err);
        }
    };



    useEffect(() => {
        const getIngredientsData = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if (!token) {
                    return false;
                }

                const response = await getMe(token);

                if (!response.ok) {
                    throw new Error('something went wrong!');
                }

                const user = await response.json();
                setIngredientsData(ingredients);
            }
            catch (err) {
                console.error(err);
            }
        };
        getIngredientsData();
    }, [userIngredientsLength]);

    const handleDeleteIngredient = async (Ingredient) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await handleDeleteIngredient(Ingredient, token);
            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const updatedIngredient = await response.json();
            setIngredientsData(updatedIngredient);
            removeIngredientsID(Ingredients.name);
        }
        catch (err) {
            console.error(err);
        }
    };

    return (
        <>
          <Jumbotron fluid className='text-light bg-dark'>
              <Container>
                  <h1>Add ingredients to your pantry.</h1>
                  <Form onSubmit={handleAddIngredient}>
                      <Form.Row>
                          <Col xs={12} md={8}>
                              <Form.Control
                                name='ingredientInput'
                                value={ingredientInput}
                                onChange={(e) => setIngredientInput(e.target.value)}
                                type='text'
                                size='lg'
                                placeholder=''
                              />
                          </Col>
                          <Col xs={12} md={4}>
                              <Button
                                disabled={savedIngredientsId?.some((savedIngredientId) => savedIngredientId === savedIngredients.name)}
                                type='submit' variant='success' size='lg'>
                                Submit Ingredient
                              </Button>
                          </Col>
                      </Form.Row>
                  </Form>
              </Container>
          </Jumbotron>

          <Container>
              <h2>
                  {searchedIngredients.length
                    ? `Viewing ${searchedIngredients.length} ingredients:`
                    : 'Add an ingredient to begin!'}
              </h2>
          </Container>
          
        </>
    );
};

export default IngredientsForm;