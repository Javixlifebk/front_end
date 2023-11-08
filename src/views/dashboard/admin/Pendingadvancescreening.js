import React, { useEffect, useRef, useState } from 'react'
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
  Button
} from "reactstrap"
import 'antd/dist/antd.css';
// import './index.css';
import { SearchOutlined } from '@ant-design/icons';
import {  Input, Space, Table } from 'antd';
import '@mui/x-data-grid-generator'
import { DataGrid, GridToolbar, GridToolbarContainer, GridFilterPanel, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid'
import axios from "axios";
import { Star, Search } from "react-feather";
import Highlighter from 'react-highlight-words';
import { CSVLink } from "react-csv"


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

    </div>
  );
};
const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("-");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

function PendingAdvancedScreening() {

  const [rows, setUsers] = useState('');

  const [totalPages, settotal] = useState(1);
  const [Pages, setpages] = useState(2);
  const [size, setsize] = useState(3);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gridApi, setGridApi] = useState();
  useEffect(() => {

    fetchRecords(1, 10);
  }, [])

  const fetchRecords = (page, size) => {
    axios.post("http://localhost:3010/api/generalsurvey/screenersevika", {
      "pageNo": page,
      "size": size,
      ngoId:(localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
    })
      .then(response => {

        if (response.data.status === 1) {
          var recs = response.data.data;

          // console.log(response.data.total);
          setUsers(recs);

          settotal(response.data.total)
          console.log("111111111111", response.data.total);
          setpages(response.data.pages)
          console.log("2222222", response.data.pages);
          setsize(response.data.size)
          console.log("333333333", response.data.size);
          console.log(recs);
        }
      }, []);
  };
  const getFilterType = () => {
    if (startDate !== "" && endDate !== "") return "inRange";
    else if (startDate !== "") return "greaterThan";
    else if (endDate !== "") return "lessThan";
  };
  useEffect(() => {
    if (gridApi) {
      if (startDate !== "" && endDate !== "" && startDate > endDate) {
        alert("Start Date should be before End Date");
        setEndDate("");
      } else {
        var dateFilterComponent = gridApi.api.getFilterInstance("createdAt");
        dateFilterComponent.setModel({
          type: getFilterType(),
          dateFrom: startDate ? startDate : endDate,
          dateTo: endDate,
        });
        gridApi.api.onFilterChanged();
      }
    }
  }, [startDate, endDate]);
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

    {
      title: "citizenId ",
      dataIndex: "citizenId",
      key: 'citizenId',
      width: '40%',
      // render: (text, record) => (
      //   <span>{record.firstName} {record.lastName}</span>
      // ),
      ...getColumnSearchProps('citizenId'),
    },
    {
      title: 'caseId',
      dataIndex: 'caseId',
      key: 'caseId',
      // width: '20%',
      ...getColumnSearchProps('caseId'),
    },
    {
      title: 'ScreenerId',
      dataIndex: 'screenerId',
      key: 'screenerId',
      // width: '20%',
      ...getColumnSearchProps('screenerId'),
    },
    {
      title: 'Citizen Name',
      dataIndex: 'fullname',
      key: 'fullname',
      // width: '20%',
      ...getColumnSearchProps('fullname'),
    },
   
    {
      title: 'Screener Name',
      dataIndex: 'screenerfullname',
      key: 'screenerfullname',
      // width: '20%',
      ...getColumnSearchProps('screenerfullname'),
    },
    {
      title: 'DOB',
      dataIndex: 'DOB',
      key: 'DOB',
      // width: '20%',
      ...getColumnSearchProps('DOB'),
    },
    
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
      // width: '20%',
      ...getColumnSearchProps('Gender'),
    },
    {
      title: 'Age',
      dataIndex: 'Age',
      key: 'Age',
      // width: '20%',
      ...getColumnSearchProps('Age'),
    },
   
    {
      title: 'Mobile',
      dataIndex: 'Mobile',
      key: 'Mobile',
      // width: '20%',
      ...getColumnSearchProps('Mobile'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      // width: '20%',
      ...getColumnSearchProps('address'),
    },
   
   
    
    {
      title: 'created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      // width: '20%',
      ...getColumnSearchProps('createdAt'),
      onFilter:dateFilterParams
    },

  






  ];

  return (
    <>
      <Row>
        <Col sm="12">
          <CardTitle><b><h3>Advanced Screening Pending Cases</h3></b> </CardTitle>
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
        {/* <Col sm="6" ></Col> */}
        {/* <Col sm="6 d-flex justify-content-end">
        <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    
                  >
                    <CSVLink
              filename={"ScreenerSevikaReport.csv"}
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
        </Col> */}
      </Row>
      <Table columns={columns} dataSource={rows}
        locale={{ emptyText: "loading..." }}
        pagination={{
          pageSize: size,
          total: totalPages,
          onChange: (page, size) => {
            fetchRecords(page, size);
            setsize(size)
          },
          // total:85,
          showTotal: (total) => `Total : ${total} Records`
          // showTotal: (total) =>{ `Total ${total} items`}
        }}

      />
    </>
  );
};

export default PendingAdvancedScreening