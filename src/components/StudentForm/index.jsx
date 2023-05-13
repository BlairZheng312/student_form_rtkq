import React, { useEffect, useState } from 'react'
import { useAddStudentMutation, useGetStudentsByIdQuery, useUpdateStudentMutation } from '../../store/studentApi'
import './index.css'

export default function StudentForm(props) {
    const [student, setStudent] = useState({
        name: '',
        gender: 'female',
        age: '',
        address: ''
    })

    const { data: studentData, isSuccess } = useGetStudentsByIdQuery(props.studentId, {
        skip: !props.studentId
    })

    const [addStudent] = useAddStudentMutation()
    const [updateStudent] = useUpdateStudentMutation()

    useEffect(() => {
        if (isSuccess) {
            setStudent(studentData.attributes)
        }
    }, [isSuccess])

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


    const addHandler = () => {
        addStudent(student)
        setStudent({
            name: '',
            gender: 'female',
            age: '',
            address: ''
        })
    }

    const editHandler = () => {
        updateStudent({
            id: props.studentId,
            attributes: student
        })
        props.cancel()
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
                    {props.studentId && <>
                        <button onClick={props.cancel}>Cancel</button>
                        <button onClick={editHandler}>Update</button>
                    </>
                    }
                    {!props.studentId && <button onClick={addHandler}>Add</button>}
                </td>
            </tr>
        </>
    )
}
