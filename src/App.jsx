import React from 'react'
import { useGetStudentsQuery } from './store/studentApi'
import StudentList from './components/StudentList'

export default function App() {
  const {data:student, isSuccess, isLoading, refetch} = useGetStudentsQuery(null, {
    // selectFromResult: result => {
    //   if(result.data){
    //     result.data = result.data.filter(item =>  item.attributes.age<28 )
    //   }     
    //   return result
    // },
    pollingInterval: 0,
    refetchOnFocus: true,
    refetchOnReconnect: true
  })
  return (   
      <div>
        <button onClick={refetch}>Load Student Data</button>
        {isLoading && <h3>Loading</h3>}
        {isSuccess && <StudentList stus={student}/>}
        </div>
  )
}

