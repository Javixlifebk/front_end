import React, { useEffect,useRef, useState } from 'react'
// import { environment } from '../../api'
// import { Space, Table, Tag } from 'antd';
// import {Image, Button} from 'antd';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Badge,
  // Input,
  Button
} from "reactstrap"
import 'antd/dist/antd.css';
import { CSVLink } from "react-csv"
// import './index.css';
import { SearchOutlined } from '@ant-design/icons';
import {  Input, Space, Table,Spin } from 'antd';
import '@mui/x-data-grid-generator'
import { DataGrid, GridToolbar,GridToolbarContainer,GridFilterPanel,GridToolbarExport,GridToolbarFilterButton } from '@mui/x-data-grid'
import axios from "axios";
import { Star, Search } from "react-feather";
import Highlighter from 'react-highlight-words';
import loaderImg from "../../images/loader.gif"
import profileImg from "../../../assets/img/icons/viewprofile.png"
import pickImg from "../../../assets/img/icons/activate.png"
// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
//       {/* <GridFilterPanel /> */}
//       <GridToolbarFilterButton />
//     </GridToolbarContainer>
//   );
// }

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
  
function CitizenList() {
   
    const [rows, setUsers] = useState('');
    
    const [totalPages, settotal] = useState(1);
    const [Pages, setpages] = useState(2);
    const [size, setsize] = useState(3);
    useEffect(() => {
        
      fetchRecords(1,100);
},[])

const fetchRecords = (page,size) => {
  axios.post("https://javixlife.org/api/citizen/citizenListPagination?",{
    "pageNo":page,
    "size":size,
    token:'dfjkhsdfaksjfh3756237',
 
    ngoId:(localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
    // v:_v 
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
const handleClick=(_userid)=> {    
  localStorage.setItem("citizenId",_userid);
  //alert(_userid)
  window.location='/dashboard/citizenprofile'  
}
// const handleSubmit=()=> {
  
//   //alert('Hellow')
//   if(localStorage.getItem("roleId")==="1" || localStorage.getItem("roleId")===1){
//     alert("Sorry as a Doctor you are not entitled for this.");

//   }else{
//   window.location='/dashboard/addcitizen'
//   }
// }
  

 const handleSubmit=()=> {
  
 
  if(localStorage.getItem("roleId")==="1" || localStorage.getItem("roleId")===1){
    alert("Sorry as a Doctor you are not entitled for this.");

  }else{
  window.location='/dashboard/addcitizen'
  }
}
const getImage=(imagUrl)=>{
  if(imagUrl===null || imagUrl===undefined || imagUrl==='' ){
    imagUrl='https://javixlife.org/profile/no-photo-male.jpg';
  }
 return imagUrl;
}

const getCaseDetails=(citizenId)=>{
  localStorage.setItem("citizenId",citizenId);
  // alert(citizenId)
  document.location=`/dashboard/doctor/patientlist`;  
}

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
    // {
    //   title: "Citizen",
    //   dataIndex: "ID",
    //   key: 'photo',
    //   style: { 'whiteSpace': 'unset' },
    //   minWidth: "50px",
    //   render: (row) => (
    //     <div>
        
    //     <img
    //         //  src={()=>getImage(row.photo)}
    //         src={`https://javixlife.org/profile/no-photo-male.jpg`}
    //         width="40vh"
    //         className="img-fluid img-border rounded-circle box-shadow-1"
    //       />



    //       </div>
    //   )
    // },

    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <img
          src={photo || 'http://javixlife.org/profile/no-photo-male.jpg'}
          width="70px"
          height="70px"
          alt="Citizen Photo"
          className="img-fluid"
        />
      ),
    },
   
    {
        title: "Citizen Name",
        dataIndex: "fullname",
        key: 'fullname',
        width:'10%',
        // render: (text, record) => (
        //   <span>{record.firstName} {record.lastName}</span>
        // ),
         ...getColumnSearchProps('fullname'),
      },
      {
        title: "Citizen ID",
        dataIndex: "citizenId",
        key: 'citizenId',
        // render: (text, record) => (
        //   <span>{record.firstName} {record.lastName}</span>
        // ),
         ...getColumnSearchProps('citizenId'),
      },
     
      {
        title: 'Mobile',
        dataIndex: 'mobile',
        key: 'mobile',
        // width: '20%',
        ...getColumnSearchProps('mobile'),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        //  width: '20%',
        ...getColumnSearchProps('email'),
      },
      // {
      //   title: 'Address',
      //   dataIndex: 'address',
      //   key: 'address',
      //   // width: '20%',
      //   ...getColumnSearchProps('address'),
      // },
      {
        title: 'Screener FullName',
        dataIndex: 'screenerfullname',
        key: 'screenerfullname',
        width: '40%',
        ...getColumnSearchProps('screenerfullname'),
      },
      {
        title: 'onBoarding Date',
        dataIndex: 'createdAt',
       key: 'createdAt',
        render: (_, row) => (
          <p size="middle">
             {/* {row.issubscreener > 0 ? "Sevika" : "Sanyojika"}, */}
          </p>
        ),
      
        // width: '20%',
        ...getColumnSearchProps('createdAt'),
      },
     
      
      {
        title: 'Action',
        key: 'alerts',
        width: '100%',
        render: (_, row) => (
          <div className='row '>
            <div className='col-md-6 d-flex justify-content-center'>
        <img
        src={profileImg}
        alt="porfileImg"
        onClick={() => handleClick(row.citizenId)}
        style={{width:"40px",cursor:"pointer"}}
        className="img-fluid img-border rounded-circle box-shadow-1"
      />    
      </div>
      <div className='col-md-6 d-flex justify-content-center'>
      <img
        src={pickImg}
        alt="profileImg"
        onClick={() => getCaseDetails(row.citizenId)}
        style={{width:"40px",cursor:"pointer"}}
        className="img-fluid img-border rounded-circle box-shadow-1"
      />
      </div>
      
          </div>
          
        ),
      },
     
    ];
    
    return (
      <>
       <Row>
      <Col sm="12">
      <CardTitle><b><h3>Citizen List</h3></b> </CardTitle>
      </Col>          
      </Row>
      <Row>
      {/* <div className="col-sm-6 pb-1">
            <div className="row">
              <div className="col-sm-6">
             <label className="d-flex"> From :</label>
               <input
          // style={{ width: 100 }}
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
              </div>
              <div className="col-sm-6">
             <label className="d-flex"> To :</label>
              <input
            // style={{ width: 100 }}
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
              </div>
            </div>
          </div> */}
        <Col sm="6" ></Col>
        <Col sm="6 d-flex justify-content-end">
        <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    outline
                    onClick={()=>handleSubmit()}
                    
                  >
                  Add citizen
                  </Button.Ripple>
        </Col>
      </Row>
      <Row>
        <Col sm="6" ></Col>
        <Col sm="6 d-flex justify-content-end">
        <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    
                  >
                    <CSVLink
              filename={"citizenReport.csv"}
              data={rows}
              
              onClick={()=>{
                console.log("The file is downloading")
              }}
              style={{
              
                color: "#fff"
              }}
            >
              Export
            </CSVLink> 
                  </Button.Ripple>
        </Col>
      </Row>
      {/* <Row>
      <Button.Ripple
       color="primary"
       type="submit"
       className="mr-1 mb-1"
            outline
            onClick={()=>handleSubmit}
          >
            Add Citizen
          </Button.Ripple>
      </Row> */}
    <Table columns={columns} dataSource={rows}
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
    {/* <span>total:{{totalPages}}</span> */}
    </>
    );
  };

export default CitizenList