import React, { useEffect} from 'react'
import StudentList from './components/StudentList'
import './App.css'
import StudentContext from './store/StudentContext'
import useFetch from './hooks/useFetch'

// const STU_DATA = [{
//   id: '1',
//   attributes: {
//     name: 'Monkey King',
//     gender: 'male',
//     age: 28,
//     address: 'Fruit Mountain'
//   }
// }, {
//   id: '2',
//   attributes: {
//     name: 'Bat Man',
//     gender: 'male',
//     age: 38,
//     address: 'Cave'
//   }
// }, {
//   id: '3',
//   attributes: {
//     name: 'Iron Man',
//     gender: 'male',
//     age: 28,
//     address: 'Marvel'
//   }
// }, {
//   id: '4',
//   attributes: {
//     name: 'Black Widow',
//     gender: 'female',
//     age: 48,
//     address: 'Marvel'
//   }
// }
// ]

export default function App() {

  const {data: studentData, loading, error, fetchData} = useFetch({
    url: `students`
  })

  useEffect(() => {
    fetchData()
  }, [])

  const loadDataHandler = () => {
    fetchData()
  }

  return (
    <StudentContext.Provider value={{fetchData}}>
    <div className='App'>
      <button onClick={loadDataHandler}>Load Student Data</button>
      {(!loading && !error) && <StudentList stus={studentData} />}
      {loading && <h3>Loading...</h3>}
      {error && <h3>Error</h3>}
    </div>
    </StudentContext.Provider>
  )
}


