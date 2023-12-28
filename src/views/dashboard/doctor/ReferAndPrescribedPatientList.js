import React, { useEffect,useRef, useState } from 'react'
// import { environment } from '../../api'
// import { Space, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
// import './index.css';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import '@mui/x-data-grid-generator'
import { DataGrid, GridToolbar,GridToolbarContainer,GridFilterPanel,GridToolbarExport,GridToolbarFilterButton } from '@mui/x-data-grid'
import axios from "axios";
import { Star, Search } from "react-feather";
import Highlighter from 'react-highlight-words';
// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
//       {/* <GridFilterPanel /> */}
//       <GridToolbarFilterButton />
//     </GridToolbarContainer>
//   );
// }
const data = [
    // {
    //   key: '1',
    //   name: 'John Brown',
    //   age: 32,
    //   address: 'New York No. 1 Lake Park',
    // },
    // {
    //   key: '2',
    //   name: 'Joe Black',
    //   age: 42,
    //   address: 'London No. 1 Lake Park',
    // },
    // {
    //   key: '3',
    //   name: 'Jim Green',
    //   age: 32,
    //   address: 'Sidney No. 1 Lake Park',
    // },
    // {
    //   key: '4',
    //   name: 'Jim Red',
    //   age: 32,
    //   address: 'London No. 2 Lake Park',
    // },
  ];
  let p_status= [
    {
      0:'Not Done',
      1:'Not Done',
      2:'Not Done',
      3:'Done',
    }
  ]
  
  const CustomHeader = (props) => {
    return (
      <div className="d-flex flex-wrap justify-content-between">
        <div className="add-new"></div>
        <div className="row">
          <div className="col-sm-3">
            <div className="position-relative has-icon-left mb-1">
              <Input
                value={props.value.firstName}
                placeholder="search by name"
                onChange={(e) => props.handleFilter(e)}
              />
              <div className="form-control-position">
                <Search size="15" />
              </div>
            </div>
          </div>
          
        </div>
        {/* <div className="position-relative has-icon-left mb-1">
          <Input
            value={props.value}
            placeholder="search"
            onChange={(e) => props.handleFilter(e)}
          />
          <div className="form-control-position">
            <Search size="15" />
          </div>
        </div> */}
      </div>
    );
  };
  

function ReferPatientList() {
   
    const [rows, setUsers] = useState('');
    useEffect(() => {
        axios.post("https://javixlife.org/api/citizen/citizenRefersAllReferAndNonPrescribed", {token:'dfjkhsdfaksjfh3756237',ngoId:localStorage.getItem("ngoId")})
       .then(response => {
                 
                  if(response.data.status===1)
                    {
                        var recs=response.data.data.data;
                        setUsers(recs);
                    }
       },[]);
     
},[])
const filterData = (data) =>
    data.map((item) => ({
      key: item,
      value: item,
      text: item
    }));

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
   const  getCitizenScreener=(_screenerId) =>{
        localStorage.setItem("_screenerId", _screenerId);
        document.location = "/dashboard/citizenlist1";
      }
      const  getCaseScreener=(citizenId) =>{
        localStorage.setItem("citizenId", citizenId);
        // alert(citizenId, "###################")
        document.location =  `/dashboard/doctor/refercaseslist`;
       
        // console.log("screener Id ",screenerId);
      }
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div
          style={{
            padding: 8,
          }}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
     
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
    // console.log(p_status,"==========================status")
    const columns = [
      {
        title: "citizen ID -",
        dataIndex: "citizenId",
        key: 'citizenId',
        // render: (text, record) => (
        //   <span>{record.firstName} {record.lastName}</span>
        // ),
         ...getColumnSearchProps('citizenId'),
      },
      {
        title: "Citizen Name",
        dataIndex: "fullname",
        key: 'fullname',
        // render: (text, record) => (
        //   <span>{record.firstName} {record.lastName}</span>
        // ),
         ...getColumnSearchProps('fullname'),
      },
      {
        title: "Screener Name",
        dataIndex: "screenerfullname",
        key: 'screenerfullname',
        // render: (text, record) => (
        //   <span>{record.firstName} {record.lastName}</span>
        // ),
         ...getColumnSearchProps('screenerfullname'),
      },
      {
        title: 'Mobile',
        dataIndex: 'mobile',
        key: 'mobile',
        width: '20%',
        ...getColumnSearchProps('mobile'),
      },
      {
        title: 'Gender',
        dataIndex: 'sex',
        key: 'sex',
        width: '20%',
        filters: [{ text: 'Male', value: 'Male' }, { text: 'Female', value: 'Female' }],
        onFilter: (value, record) => record.sex.indexOf(value) === 0
      },
      // {
      //   title: 'Status',
      //   dataIndex: 'pstatus',       
      //   key: 'pstatus',
      //   width: '20%',
      //   ...getColumnSearchProps('pstatus'),
      // },
 
        {
          title: 'Status',
          dataIndex: 'pstatus',
          key: 'pstatus',
          width: '20%',
          ...getColumnSearchProps('pstatus'),
          render: (text) => p_status[0][text],
        },
     
      {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '20%',
        ...getColumnSearchProps('createdAt'),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <button size="middle"
          className="btn-success"
          onClick={() => getCaseScreener(record.citizenId)}>
            <a>Pick And Prescribe</a>
          </button>
        ),
      },
    ];
    
    return <Table columns={columns} dataSource={rows} />;
  };

export default ReferPatientList