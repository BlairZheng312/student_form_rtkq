import React, { useCallback, useContext, useState } from 'react'
import './index.css'
import StudentContext from '../../store/StudentContext'
import useFetch from '../../hooks/useFetch'

export default function StudentForm(props) {
    const [student, setStudent] = useState({
        name: props.student ? props.student.attributes.name : '',
        gender: props.student ? props.student.attributes.gender : 'female',
        age: props.student ? props.student.attributes.age : '',
        address: props.student ? props.student.attributes.address : ''
    })

    const nameHandler = (e) => {
        setStudent((prevStudent) => ({ ...prevStudent, name: e.target.value }))
    }
    const genderHandler = (e) => {
        setStudent((prevStudent) => ({ ...prevStudent, gender: e.target.value }))
    }
    const ageHandler = (e) => {
        setStudent((prevStudent) => ({ ...prevStudent, age: +e.target.value }))
    }
    const addressHandler = (e) => {
        setStudent((prevStudent) => ({ ...prevStudent, address: e.target.value }))
    }

    const studentContext = useContext(StudentContext)

    const { loading, error, fetchData: updateStudent } = useFetch({
        url: props.student ? `students/${props.student.id}` : `students`,
        method: props.student ? 'put' : 'post'
    }, studentContext.fetchData)

    const addHandler = () => {
        updateStudent(student)
    }

    const editHandler = () => {
        updateStudent(student)
    }

    return (
        <>
            <tr className='student-form'>
                <td><input type="text" onChange={nameHandler} value={student.name} /></td>
                <td>
                    <select onChange={genderHandler} value={student.gender}>
                        <option value="female">female</option>
                        <option value="male">male</option>
                    </select>
                </td>
                <td><input type="text" onChange={ageHandler} value={student.age} /></td>
                <td><input type="text" onChange={addressHandler} value={student.address} /></td>

                <td>
                    {props.student && <>
                        <button onClick={props.cancelEdit}>Cancel</button>
                        <button onClick={editHandler}>Update</button>
                    </>
                    }
                    {!props.student && <button onClick={addHandler}>Add</button>}

                </td>
            </tr>
            {loading && <tr><td colSpan={5}>Loading</td></tr>}
            {error && <tr><td colSpan={5}>Adding failed</td></tr>}
        </>

    )
}
