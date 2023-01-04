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
import { Spin, Icon } from 'antd';
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
  // axios.post("http://javixlife.org:3010/api/ngo/screenerList?=", {
  //           token: "dfjkhsdfaksjfh3756237",
  //           userId: "demoUser",
  //         })
function InsightsTable() {
   
  const [rows, setUsers] = useState('');
    
  const [totalPages, settotal] = useState(1);
  const [Pages, setpages] = useState(2);
  const [size, setsize] = useState(3);
  useEffect(() => {
      
    fetchRecords(1,10);
},[])

const fetchRecords = (page,size) => {
axios.post("http://javixlife.org:3010/api/ngo/screenerList?=" ,{
  "pageNo":page,
  "size":size,
  token: "dfjkhsdfaksjfh3756237",
   userId: localStorage.getItem("userid"),
   ngoId:(localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
  })
.then(response => {
         
          if(response.data.status===1)
            {
                var recs=response.data.data;

                // console.log(response.data.total);
                setUsers(recs);

                settotal(response.data.total)
                console.log("111111111111",response.data.total);
                setpages(response.data.pages)
                console.log("2222222",response.data.pages);
                setsize(response.data.size)
                console.log("333333333",response.data.size);
                console.log(recs);
            }
},[]);
};
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
      const  getCaseScreener=(screenerId) =>{
        localStorage.setItem("screenerId", screenerId);
        // alert(screenerId, "###################")
        document.location =  `/dashboard/casesList`;
       
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
            textToHighlight={text ? text.toString() : 'not found'}
          />
        ) : (
          text
        ),
    });
    
    const columns = [
    //   {
    //     title: 'Name',
    //     dataIndex: 'firstName',
    //     key: 'firstName',
    //     render: (_, { firstName }) => (
    //         <button>
    //           {firstName.map((tag) => {
    //           return (
    //               <a  key={tag}>
    //                 {tag.toUpperCase()}
    //               </a>
    //             );
    //           })}
    //         </button>
    //       ),
    //     width: '30%',
    //     ...getColumnSearchProps('firstName'),
    //   },
   
    {
        title: "Screener Name",
        dataIndex: "fullname",
        key: 'fullname',
        // render: (text, record) => (
        //   <span>{record.firstName} {record.lastName}</span>
        // ),
         ...getColumnSearchProps('fullname'),
      },
      {
        title: 'Mobile',
        dataIndex: 'mobile',
        key: 'mobile',
        width: '20%',
        ...getColumnSearchProps('mobile'),
      },
      {
        title: 'New Citizens',
        dataIndex: 'numOfCitizens',
        key: 'numOfCitizens',
        width: '20%',
        ...getColumnSearchProps('numOfCitizens'),
      },
      {
        title: 'Total Cases',
        dataIndex: 'numOfCases',
        key: 'numOfCases',
        width: '20%',
        ...getColumnSearchProps('numOfCases'),
      },
      {
        title: 'Gender',
        dataIndex: 'sex',
        key: 'sex',
        width: '20%',
        filters: [{ text: 'Male', value: 'Male' }, { text: 'Female', value: 'Female' }],
        onFilter: (value, record) => record.sex.indexOf(value) === 0
      },
      {
        title: 'Role',
        dataIndex: 'issubscreener',
       key: 'issubscreener',
        render: (_, row) => (
          <p size="middle">
             {/* {row.issubscreener > 0 ? "Sevika" : "Sanyojika"}, */}
          </p>
        ),
      
        width: '20%',
        ...getColumnSearchProps('issubscreener'),
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '20%',
        ...getColumnSearchProps('age'),
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
          onClick={() => getCaseScreener(record.screenerId)}>
            <a>view</a>
          </button>
          
        ),
      },
    ];
    
    return(
      <>
   <Table columns={columns} dataSource={rows}
    //   loading={{ indicator: <div><Spin /></div> ,spinning:!rows}} 
    loading={{ indicator: <div><Spin /></div> ,spinning:!rows}} 
    pagination={{
      pageSize:size,
      total:totalPages,
      onChange: (page,size) => {
        fetchRecords(page,size);
        setsize(size)
      },
      // total:85,
      showTotal: (total) => `Total : ${total} Records`
      // showTotal: (total) =>{ `Total ${total} items`}
    }}
    
    />
    </>
    )
  };

export default InsightsTable