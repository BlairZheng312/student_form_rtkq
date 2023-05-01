import React, { useState } from 'react'
import StudentForm from '../StudentForm'
import { useDelStudentMutation } from '../../store/studentApi'

export default function Student(props) {
  const { id, attributes: { name, gender, age, address } } = props.student
  const [editing, setEditing] = useState(false)
  const [delStudent] = useDelStudentMutation()

  const deleteHandler = () => {
    delStudent(props.student.id)
  }

  const editHandler = () => {
    setEditing(true)
  }

  const cancelEdit = () => {
    setEditing(false)
}

  return (
    <>
      {!editing && <tr>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{age}</td>
        <td>{address}</td>
        <td>
          {!editing && <button onClick={deleteHandler}>Delete</button>}
          {editing && <button onClick={deleteHandler}>Cancel</button>}
          
          <button onClick={editHandler}>Edit</button>
        </td>
      </tr>}
      {editing && <StudentForm studentId={id} cancel={cancelEdit}/>  }
    </>
  )
}
