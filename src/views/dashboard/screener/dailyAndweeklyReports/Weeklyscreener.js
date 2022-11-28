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
import { Input, Space, Table } from 'antd';
import '@mui/x-data-grid-generator'
import { DataGrid, GridToolbar, GridToolbarContainer, GridFilterPanel, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid'
import axios from "axios";
import { Star, Search } from "react-feather";
import Highlighter from 'react-highlight-words';
import { CSVLink } from "react-csv"
import { style } from '@mui/system';
import { Spin, Icon } from 'antd';




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

function WeeklyScreener() {
  // const tableLoading = {
  //   spinning: loading,
  //   indicator: <Icon type="loading" style={{ fontSize: 24 }} spin />,
  // }
  // const antIcon = {<Icon type="loading" style={{ fontSize: 24 }} spin />};

  const [rows, setUsers] = useState('');

  const [totalPages, settotal] = useState(1);
  const [Pages, setpages] = useState(2);
  const [size, setsize] = useState(3);
  useEffect(() => {

    fetchRecords(1, 500);
  }, [])

  const fetchRecords = (page, size) => {
    axios.post("http://javixlife.org:3010/api/generalsurvey/screeningScreener", {
      "pageNo": page,
      "size": size
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
      dataIndex: 'ScreenerId',
      key: 'ScreenerId',
      // width: '20%',
      ...getColumnSearchProps('ScreenerId'),
    },
    {
      title: 'Citizen Name',
      dataIndex: 'fullname',
      key: 'fullname',
      // width: '20%',
      ...getColumnSearchProps('fullname'),
    },
   
    // {
    //   title: 'Screener Name',
    //   dataIndex: 'screenerfullname',
    //   key: 'screenerfullname',
    //   // width: '20%',
    //   ...getColumnSearchProps('screenerfullname'),
    // },
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
      title: 'Aadhar number',
      dataIndex: 'aadhaar',
      key: 'aadhaar',
      // width: '20%',
      ...getColumnSearchProps('aadhaar'),
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
    // {
    //   title: 'Height',
    //   dataIndex: 'height',
    //   key: 'height',
    //   // width: '20%',
    //   ...getColumnSearchProps('height'),
    // },
    // {
    //   title: 'Weight',
    //   dataIndex: 'weight',
    //   key: 'weight',
    //   // width: '20%',
    //   ...getColumnSearchProps('weight'),
    // },
    // {
    //   title: 'bmi',
    //   dataIndex: 'bmi',
    //   key: 'bmi',
    //   // width: '20%',
    //   ...getColumnSearchProps('bmi'),
    // },
    // {
    //   title: 'bpsys',
    //   dataIndex: 'bpsys',
    //   key: 'bpsys',
    //   // width: '20%',
    //   ...getColumnSearchProps('bpsys'),
    // },
    // {
    //   title: 'bpdia',
    //   dataIndex: 'bpdia',
    //   key: 'bpdia',
    //   // width: '20%',
    //   ...getColumnSearchProps('bpdia'),
    // },
    // {
    //   title: 'spo2',
    //   dataIndex: 'spo2',
    //   key: 'spo2',
    //   // width: '20%',
    //   ...getColumnSearchProps('spo2'),
    // },
    // {
    //   title: 'pulse',
    //   dataIndex: 'pulse',
    //   key: 'pulse',
    //   // width: '20%',
    //   ...getColumnSearchProps('pulse'),
    // },
    // {
    //   title: 'temperature',
    //   dataIndex: 'temperature',
    //   key: 'temperature',
    //   // width: '20%',
    //   ...getColumnSearchProps('temperature'),
    // },
    // {
    //   title: 'arm',
    //   dataIndex: 'arm',
    //   key: 'arm',
    //   // width: '20%',
    //   ...getColumnSearchProps('arm'),
    // },
    // {
    //   title: 'Left Eye Range',
    //   dataIndex: 'leyeleft',
    //   key: 'leyeleft',
    //   // width: '20%',
    //   ...getColumnSearchProps('leyeleft'),
    // },
    // {
    //   title: 'Right Eye Range',
    //   dataIndex: 'reyeright',
    //   key: 'reyeright',
    //   // width: '20%',
    //   ...getColumnSearchProps('reyeright'),
    // },
    {
      title: 'hemoglobins',
      dataIndex: 'hemoglobins',
      key: 'hemoglobins',
      // width: '20%',
      ...getColumnSearchProps('hemoglobins'),
    },
    // {
    //   title: 'Blood Glucose unit',
    //   dataIndex: 'unit',
    //   key: 'unit',
    //   // width: '20%',
    //   ...getColumnSearchProps('unit'),
    // },
    // {
    //   title: 'Blood Glucose type',
    //   dataIndex: 'btype',
    //   key: 'btype',
    //   // width: '20%',
    //   ...getColumnSearchProps('btype'),
    // },
 
    // {
    //   title: 'nitrite',
    //   dataIndex: 'nitrite',
    //   key: 'nitrite',
    //   // width: '20%',
    //   ...getColumnSearchProps('nitrite'),
    // },
    // {
    //   title: 'urobilinogen',
    //   dataIndex: 'urobilinogen',
    //   key: 'urobilinogen',
    //   // width: '20%',
    //   ...getColumnSearchProps('urobilinogen'),
    // },
    // {
    //   title: 'protein',
    //   dataIndex: 'protein',
    //   key: 'protein',
    //   // width: '20%',
    //   ...getColumnSearchProps('protein'),
    // },
    // {
    //   title: 'blood',
    //   dataIndex: 'blood',
    //   key: 'blood',
    //   // width: '20%',
    //   ...getColumnSearchProps('blood'),
    // },
    // {
    //   title: 'specificGravity',
    //   dataIndex: 'specificGravity',
    //   key: 'specificGravity',
    //   // width: '20%',
    //   ...getColumnSearchProps('specificGravity'),
    // },
    // {
    //   title: 'ketone',
    //   dataIndex: 'ketone',
    //   key: 'ketone',
    //   // width: '20%',
    //   ...getColumnSearchProps('ketone'),
    // },
    // {
    //   title: 'bilirubin',
    //   dataIndex: 'bilirubin',
    //   key: 'bilirubin',
    //   // width: '20%',
    //   ...getColumnSearchProps('bilirubin'),
    // },
    // {
    //   title: 'PH',
    //   dataIndex: 'PH',
    //   key: 'PH',
    //   // width: '20%',
    //   ...getColumnSearchProps('PH'),
    // },
    // {
    //   title: 'Urine Glucose',
    //   dataIndex: 'urineglucose',
    //   key: 'urineglucose',
    //   // width: '20%',
    //   ...getColumnSearchProps('urineglucose'),
    // },
    // {
    //   title: 'leukocytes',
    //   dataIndex: 'leukocytes',
    //   key: 'leukocytes',
    //   // width: '20%',
    //   ...getColumnSearchProps('leukocytes'),
    // },
    // {
    //   title: 'FVC Predicted',
    //   dataIndex: 'fvc_predicted',
    //   key: 'fvc_predicted',
    //   // width: '20%',
    //   ...getColumnSearchProps('fvc_predicted'),
    // },
    // {
    //   title: 'FVC Actual',
    //   dataIndex: 'fvc_actual',
    //   key: 'fvc_actual',
    //   // width: '20%',
    //   ...getColumnSearchProps('fvc_actual'),
    // },
    // {
    //   title: 'FVC Predicted Percent',
    //   dataIndex: 'fvc_predicted_percent',
    //   key: 'fvc_predicted_percent',
    //   // width: '20%',
    //   ...getColumnSearchProps('fvc_predicted_percent'),
    // },
    // {
    //   title: 'FEV1 Predicted',
    //   dataIndex: 'fev1_predicted',
    //   key: 'fev1_predicted',
    //   // width: '20%',
    //   ...getColumnSearchProps('fev1_predicted'),
    // },
    // {
    //   title: 'FEV1 Actual',
    //   dataIndex: 'fev1_actual',
    //   key: 'fev1_actual',
    //   // width: '20%',
    //   ...getColumnSearchProps('fev1_actual'),
    // },
    // {
    //   title: 'FEV1 Predicted Percent',
    //   dataIndex: 'fev1_predicted_percent',
    //   key: 'fev1_predicted_percent',
    //   // width: '20%',
    //   ...getColumnSearchProps('fev1_predicted_percent'),
    // },
    // {
    //   title: 'PEF Predicted',
    //   dataIndex: 'pef_predicted',
    //   key: 'pef_predicted',
    //   // width: '20%',
    //   ...getColumnSearchProps('pef_predicted'),
    // },
    // {
    //   title: 'PEF Actual',
    //   dataIndex: 'pef_actual',
    //   key: 'pef_actual',
    //   // width: '20%',
    //   ...getColumnSearchProps('pef_actual'),
    // },
    // {
    //   title: 'PEF Predicted Percent',
    //   dataIndex: 'pef_predicted_percent',
    //   key: 'pef_predicted_percent',
    //   // width: '20%',
    //   ...getColumnSearchProps('pef_predicted_percent'),
    // },
    // {
    //   title: 'FVC1 Predicted',
    //   dataIndex: 'fvc1_predicted',
    //   key: 'fvc1_predicted',
    //   // width: '20%',
    //   ...getColumnSearchProps('fvc1_predicted'),
    // },
    // {
    //   title: 'FVC1 Actual',
    //   dataIndex: 'fvc1_actual',
    //   key: 'fvc1_actual',
    //   // width: '20%',
    //   ...getColumnSearchProps('fvc1_actual'),
    // },
    // {
    //   title: 'FVC1 Predicted Percent',
    //   dataIndex: 'fvc1_predicted_percent',
    //   key: 'fvc1_predicted_percent',
    //   // width: '20%',
    //   ...getColumnSearchProps('fvc1_predicted_percent'),
    // },
    // {
    //   title: 'Cholesterol',
    //   dataIndex: 'cholesterol',
    //   key: 'cholesterol',
    //   // width: '20%',
    //   ...getColumnSearchProps('cholesterol'),
    // },
    // {
    //   title: 'HDLcholesterol',
    //   dataIndex: 'hdlcholesterol',
    //   key: 'hdlcholesterol',
    //   // width: '20%',
    //   ...getColumnSearchProps('hdlcholesterol'),
    // },
    // {
    //   title: 'Triglycerides',
    //   dataIndex: 'triglycerides',
    //   key: 'triglycerides',
    //   // width: '20%',
    //   ...getColumnSearchProps('triglycerides'),
    // },
    // {
    //   title: 'LDL',
    //   dataIndex: 'ldl',
    //   key: 'ldl',
    //   // width: '20%',
    //   ...getColumnSearchProps('ldl'),
    // },
    // {
    //   title: 'TC/HDL',
    //   dataIndex: 'tcl_hdl',
    //   key: 'tcl_hdl',
    //   // width: '20%',
    //   ...getColumnSearchProps('tcl_hdl'),
    // },
    // {
    //   title: 'LDL/HDL',
    //   dataIndex: 'ldl_hdl',
    //   key: 'ldl_hdl',
    //   // width: '20%',
    //   ...getColumnSearchProps('ldl_hdl'),
    // },
    // {
    //   title: 'NON_HDL',
    //   dataIndex: 'non_hdl',
    //   key: 'non_hdl',
    //   // width: '20%',
    //   ...getColumnSearchProps('non_hdl'),
    // },
    // {
    //   title: 'Lipid Glucose',
    //   dataIndex: 'lipidglucose',
    //   key: 'lipidglucose',
    //   // width: '20%',
    //   ...getColumnSearchProps('lipidglucose'),
    // },

    // {
    //   title: 'type',
    //   dataIndex: 'type',
    //   key: 'type',
    //   // width: '20%',
    //   ...getColumnSearchProps('type'),
    // },

    {
      title: 'created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      // width: '20%',
      ...getColumnSearchProps('createdAt'),
    },

  






  ];

  return (
    <>
      <Row>
        <Col sm="12">
          <CardTitle><b><h3>Daily And Weekly Screening Screener Report</h3></b> </CardTitle>
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
              filename={"ScreenerReport.csv"}
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
      {/* <Spin indicator={tableLoading} />, */}
      <Table columns={columns} dataSource={rows}
        // locale={{ <Spin indicator={antIcon} /> }}
        // loading={antIcon}
        loading={{ indicator: <div><Spin /></div> ,spinning:!rows}} 
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

export default WeeklyScreener