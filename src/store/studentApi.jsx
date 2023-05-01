import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:1337/api/students/'
    }),
    tagTypes:['student'],
    endpoints(build) {
        return {
            getStudents: build.query({
                query() {
                    return ''
                },
                transformResponse(baseQueryRuturnValue) {
                    return baseQueryRuturnValue.data
                },
                providesTags:['student']
            }),
            getStudentsById: build.query({
                query(id) {
                    return `${id}`
                },
                transformResponse(baseQueryRuturnValue) {
                    return baseQueryRuturnValue.data
                },
                keepUnusedDataFor: 5,
                providesTags:['student']
            }),
            delStudent: build.mutation({
                query(id) {
                    return {
                        url: `${id}`,
                        method: 'delete'
                    }
                },
                invalidatesTags:['student']
            }),
            addStudent: build.mutation({
                query(student) {
                    return {
                        url: ``,
                        method: 'post',
                        body: {data:student}
                    }
                },
                invalidatesTags:['student']
            }),
            updateStudent: build.mutation({
                query(student) {
                    return {
                        url: `${student.id}`,
                        method: 'put',
                        body: {data:student.attributes}
                    }
                },
                invalidatesTags:['student']
            })
        }
    }
})

export const {
    useGetStudentsQuery,
    useGetStudentsByIdQuery,
    useDelStudentMutation,
    useAddStudentMutation,
    useUpdateStudentMutation
} = studentApi

export default studentApi