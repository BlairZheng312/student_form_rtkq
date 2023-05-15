import React from 'react'
import StudentForm from '../StudentForm'
import StudentEntry from '../StudentEntry'
import './index.css'

export default function StudentList(props) {
    return (
        <table>
            <caption>Student List</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {                   
                    props.stus.map(student => <StudentEntry key={student.id} student={student} />)
                }
            </tbody>
            <tfoot>
                <StudentForm />
            </tfoot>
        </table>
    )
}
