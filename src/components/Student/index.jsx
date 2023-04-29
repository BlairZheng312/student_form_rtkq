import React, { useCallback, useContext, useState } from 'react'
import StudentContext from '../../store/StudentContext'
import StudentForm from '../StudentForm'
import useFetch from '../../hooks/useFetch'

export default function Student(props) {
  const { id, attributes: { name, gender, age, address } } = props.student
  const [editing, setEditing] = useState(false)

  const studentContext = useContext(StudentContext)

  const {loading, error, fetchData:deleteStudent} = useFetch({
    url: `students/${id}`,
    method: `delete`
  }, studentContext.fetchData)

  const deleteHandler = () => {
    deleteStudent()
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
      {editing && <StudentForm student={props.student} cancel ={cancelEdit}/>  }

      {loading && <tr><td colSpan={5}>Loading</td></tr>}
      {error && <tr><td colSpan={5}>Error</td></tr>}
    </>
  )
}
