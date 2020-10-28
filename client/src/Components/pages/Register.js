import React, { useState } from 'react'
import { Form, Button } from "semantic-ui-react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"

function Register(props) {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addUser();

    }

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, result)
        {
            console.log("result", result);
            props.history.push('/') // take user back to homepage once register is complete

        },
        variables: values,
        onError(err)
        {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
            console.log("Error", err.graphQLErrors[0].extensions.exception.errors)
        }
    })
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}> 
                <h1>Register</h1>    
                <Form.Input
                    label="username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    error={errors.username ? true : false}
                    value={values.username}
                    onChange={onChange} 
                    
                />

                <Form.Input
                    label="email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    error={errors.email ? true : false}
                    value={values.email}
                    onChange={onChange} 
                />

                <Form.Input
                    label="password"
                    placeholder="Password"
                    type="password"
                    name="password"
                    error={errors.password ? true : false}
                    value={values.password}
                    onChange={onChange} 
                />

            <Form.Input
                    label="confirmPassword"
                    placeholder="confirmPassword"
                    name="confirmPassword"
                    error={errors.confirmPassword ? true : false}
                    type="password"
                    value={values.confirmPassword}
                    onChange={onChange} 
                />
                <Button type="submit primary">
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map(value => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div> 
            )}
        </div>
    )
}


const REGISTER_USER = gql`
    mutation register (
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`

export default Register
