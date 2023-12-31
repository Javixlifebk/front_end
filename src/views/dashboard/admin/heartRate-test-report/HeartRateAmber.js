import React, { useEffect,useRef, useState } from 'react'
// import { environment } from '../../api'
// import { Space, Table, Tag } from 'antd';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Badge,
  // Input,
  // Button
} from "reactstrap"
import 'antd/dist/antd.css';
// import './index.css';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table,Spin } from 'antd';
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
  
function HemoglobinAmberTest() {
   
    const [rows, setUsers] = useState('');
    
    const [totalPages, settotal] = useState(1);
    const [Pages, setpages] = useState(2);
    const [size, setsize] = useState(3);
    useEffect(() => {
        
      fetchRecords(1,100);
},[])

const fetchRecords = (page,size) => {
  axios.post("https://javixlife.org/api/labtest/getHeartRateAmberList" ,{
    "pageNo":page,
    "size":size,
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
    const setBP=(pulse)=>{
          return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>Heartrate:{pulse}</span>);
    }
   const  getCitizenScreener=(_screenerId) =>{
        localStorage.setItem("_screenerId", _screenerId);
        document.location = "/dashboard/citizenlist1";
      }
      const  getCaseScreener=(_screenerId) =>{
        localStorage.setItem("_screenerId", _screenerId);
        document.location = "/dashboard/casesList";
        console.log(_screenerId, "###################")
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
        title: 'Sr. No.',
        dataIndex: 'serialNo',
        key: 'serialNo',
        render: (_, __, index) => index + 1,
        width: '5%',
      },
      {
          title: "Patient Details",
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
          // width: '20%',
          ...getColumnSearchProps('mobile'),
        },
        
        {
          title: 'citizen ID',
          dataIndex: 'citizenId',
          key: 'citizenId',
          // width: '10%',
          ...getColumnSearchProps('citizenId'),
        },
        {
          title: 'Case ID',
          dataIndex: 'caseId',
          key: 'caseId',
          // width: '10%',
          ...getColumnSearchProps('caseId'),
        },
        {
          title: 'Screener FullName',
          dataIndex: 'screenerfullname',
          key: 'screenerfullname',
          width: '20%',
          ...getColumnSearchProps('screenerfullname'),
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          // width: '20%',
          ...getColumnSearchProps('address'),
        },
        {
          title: 'onBoarding Date',
          dataIndex: 'dateOfOnBoarding',
         key: 'dateOfOnBoarding',
          render: (_, row) => (
            <p size="middle">
               {/* {row.issubscreener > 0 ? "Sevika" : "Sanyojika"}, */}
            </p>
          ),
        
          // width: '20%',
          ...getColumnSearchProps('dateOfOnBoarding'),
        },
       
        {
          title: 'Date',
          dataIndex: 'createdAt',
          key: 'createdAt',
          // width: '20%',
          ...getColumnSearchProps('createdAt'),
        },
      
        {
          title: 'Alerts',
          key: 'alerts',
          render: (_, record) => (
            <div>     
                                   
            <p className="text-bold-500 mb-0">
            <span style={{margin:'20px;',padding:'4px;'}}>{setBP(record.pulse)}</span>&nbsp;&nbsp;
            
            </p>
            </div>
          ),
        },
      ];
      
    return (
      <>
       <Row>
      <Col sm="12">
      <CardTitle><b><h3>Heart Rate Amber Cases</h3></b> </CardTitle>
      </Col>          
      </Row>
    <Table columns={columns} dataSource={rows}
     loading={{indicator: <div><Spin /></div> ,spinning:!rows}} 

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
    {/* <span>total:{{totalPages}}</span> */}
    </>
    );
  };

export default HemoglobinAmberTest