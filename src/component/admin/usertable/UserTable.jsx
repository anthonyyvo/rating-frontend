import React, { useEffect, useState } from 'react';
import './userTable.scss';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from 'react-router-dom';

const actionColumn =  {
    field: "action",
    headerName: "Action",
    width: 60,
    renderCell: (params) => {
        return (
            <div className='cellAction'>
                {/* <div className='viewButton'>View</div> */}
                <Link to={`http://localhost:3000/admin/rating/${params.row.ratingId}`} className='deleteButton'>Edit</Link>
            </div> 
        )
    }
  }

  const initialRows = [
    { id: 1, name: '', answer: '', satisfied: null, likely: null, rating: null},
    { id: 2, name: '', answer: '', satisfied: null, likely: null, rating: null},
    { id: 3, name: '', answer: '', satisfied: null, likely: null, rating: null},
    
  ];
  const columns = [
    { field: '_id', headerName: 'ID', width: 60, renderCell: (params) => {return (
        <div>
            {params.row.id}
        </div>
    )} },
    { field: 'name', headerName: 'Full Name', width: 200 },
    {
      field: 'satisfied',
      headerName: 'Satisfied',
      type: 'number',
      width: 90,
    },
    {
      field: 'likely',
      headerName: 'Likely',
      type: 'number',
      width: 60,
    },
    {
      field: 'rating',
      headerName: 'Rating',
      type: 'number',
      width: 60,
    },
    { field: 'answer', headerName: 'Comments', width: 200 }
  ];
  const newColums = [
    ...columns.slice(0, 1),
    actionColumn,
    ...columns.slice(1)
  ]
const UserTable = ({location, days}) => {
  const [userdata, setUserdata] = useState(initialRows);
  useEffect(()=> {
      let urlRes;
      if (location) {
        urlRes = "http://localhost:5000/api/rating?location=" + location
      } else if (days) {
        urlRes = "http://localhost:5000/api/rating?days=" + days
      } 
       else {
        urlRes = "http://localhost:5000/api/rating/"
      }
      axios.get(urlRes)
      .then(res => {
        const dataFinal = res.data.reduce((acc, current, index) => {
          acc.push({
            id: index + 1,
            name: current.name,
             answer: current.answer, 
             satisfied: current.satisfied, 
             likely: current.likely, 
             rating: current.rating,
             ratingId: current._id
          })
          return acc;
        },[])
        setUserdata(dataFinal);
      })

  }, [location, days])
  return (
    <>
<div style={{ height: 600, width: '100%' }} className="table"> 
      <DataGrid
        rows={userdata ? userdata : initialRows}
        columns={newColums}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>

    </>
    
  )
}

export default UserTable;
