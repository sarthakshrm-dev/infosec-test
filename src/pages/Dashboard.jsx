import React, { useEffect, useState } from 'react'
import {
    Tab,
    Tabs,
    Form,
    Button,
  } from "react-bootstrap";
  import DesktopNav from "../components/DesktopNav";
  import MobileNav from "../components/MobileNav";
  import MobileMenu from "../components/MobileMenu";
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';

function Dashboard() {
    const [data, setData] = useState({
        title: "",
        workplace: "",
        country: "",
        city: "",
        type: "",
        description: "",
        responsibilities: "",
        qualifications: "",
        skills: [{ skill: "", experience: "" }],
        questions: [{ question: "", type: "", mustHave: false, answer: "" }],
        range: "",
        vacancies: "",
        applications: "",
        ctc: "",
        budget: "",
        payout: "",
      });
      const [payout, setPayout] = useState('percentage')
      const [showForm, setShowForm] = useState(false);
      const [key, setKey] = useState("post");
      const [menu, setMenu] = useState('details')
      const [isSmall, setIsSmall] = useState(false);
      const [err, setErr] = useState(null);

      const navigate = useNavigate();
    
      useEffect(() => {
        if(!sessionStorage.getItem('token')) {
            navigate('/')
        }

        const handleResize = () => {
          if (window.innerWidth <= 767) {
            setIsSmall(true);
          } else {
            setIsSmall(false);
          }
        };
    
        handleResize();
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    
      function handleBack() {
        if (key === "details") {
          setKey("post");
        } else if (key === "questions") {
          setKey("details");
        } else if (key === "payout") {
          setKey("questions");
        } else if (key === "review") {
          setKey("payout");
        }
      }
    
      function handleNext() {
        if (key === "post") {
          setKey("details");
        } else if (key === "details") {
          setKey("questions");
        } else if (key === "questions") {
          setKey("payout");
        } else if (key === "payout") {
          setKey("review");
        }
      }
    
      function handleChange(e) {
        const {name, value} = e.target;
        setData(pValue => {
          return{
            ...pValue,
            [name]: value
          }
        })
      }
    
      function handleLogout() {
        sessionStorage.clear();
        navigate('/')
      }

      function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/jobs', data, {
            headers: {
                Authorization: sessionStorage.getItem('token')
            }
        }).then(res => {
            if(res.status===201) {
                setMenu('details')
                setShowForm(false)
                setData({
                    userId: sessionStorage.getItem('userId'),
                    title: "",
                    workplace: "",
                    country: "",
                    city: "",
                    type: "",
                    description: "",
                    responsibilities: "",
                    qualifications: "",
                    skills: [{ skill: "", experience: "" }],
                    questions: [{ question: "", type: "", mustHave: false, answer: "" }],
                    range: "",
                    vacancies: "",
                    applications: "",
                    ctc: "",
                    budget: "",
                    payout: "",
                  })
            }
        }).catch(err => {
            setErr(err.response.data.message)
        })
      }

  return (
    <div className="h-full">
      {isSmall ? <MobileNav menu={menu} setShowForm={setShowForm} setMenu={setMenu} /> : <DesktopNav />}
      <div className="d-flex justify-content-center align-items-center dashboard">
        <div className={`d-flex + ${isSmall ? 'h-100 w-100' : 'h-85 w-95'}`}>
          {!isSmall && <div className="bg h-100 w-25 d-flex flex-column justify-content-center align-items-center">
            <div className="avatar mb-2">A</div>
            <h6>Dr. Arvind K</h6>
            <ul className="links mt-2">
              <li onClick={() => {
                setShowForm(false);
                setMenu('details');
                }}
                className={menu==='details' && 'text-primary'}>Company Details</li>
              <li onClick={() => {
                setShowForm(true);
                setMenu('addJob');
                }}
                className={menu==='addJob' && 'text-primary'}>Add a Job</li>
              <li>Job
                <ul>
                  <li>Posted Jobs</li>
                  <li>Drafts</li>
                  <li>Closed Jobs</li>
                </ul>
              </li>
              <li>Applications
                <ul>
                  <li>View Applications</li>
                  <li>Process Applications</li>
                  <li>New Applications</li>
                  <li>Shortlisted Candidates</li>
                  <li>Hired Candidates</li>
                  <li>Rejected Candidates</li>
                </ul>
              </li>
              <li>Update Profile</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>}
          <div className={isSmall ? "w-100" : "w-50"}>
            {showForm && 
            <>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3 bg"
              disabled
            >
              <Tab
                eventKey="post"
                title="Post a Job"
                className="d-flex justify-content-center"
              >
                {key === "post" && (
                  <div className={isSmall ? "w-100 px-5" : "w-50"}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control onChange={handleChange} name="title" value={data.title} type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Workplace Type</Form.Label>
                      <Form.Select onChange={handleChange} name="workplace" value={data.workplace} aria-label="Default select example">
                        <option></option>
                        <option value="On-Site">On-Site</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Remote">Remote</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Country</Form.Label>
                      <Form.Control onChange={handleChange} name="country" value={data.country} type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>City</Form.Label>
                      <Form.Control onChange={handleChange} name="city" value={data.city} type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Job Type</Form.Label>
                      <Form.Select onChange={handleChange} name="type" value={data.type} aria-label="Default select example">
                        <option></option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Intership">Intership</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                )}
              </Tab>
              <Tab
                eventKey="details"
                title="Add Details"
                className="d-flex justify-content-center"
                disabled
              >
                {key === "details" && (
                  <div className={isSmall ? "w-100 px-5" : "w-50"}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Description</Form.Label>
                      <Form.Control onChange={handleChange} name="description" value={data.description} as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Responsibilities</Form.Label>
                      <Form.Control onChange={handleChange} name="responsibilities" value={data.responsibilities} as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Qualifications</Form.Label>
                      <Form.Control onChange={handleChange} name="qualifications" value={data.qualifications} as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Minimum Requirements</Form.Label>
                      {data.skills.map((x, index) => {
                        return (
                          <div className="d-flex mb-3">
                            <Form.Control
                              className="me-3"
                              type="text"
                              placeholder="Skills"
                              value={x.skill}
                              onChange={(e) => {
                                const newSkill = [...data.skills];
                                newSkill[index].skill = e.target.value;
                                setData({ ...data, skills: newSkill });
                              }}
                            />
                            <Form.Control
                              type="text"
                              placeholder="Experience"
                              value={x.experience}
                              onChange={(e) => {
                                const newSkill = [...data.skills];
                                newSkill[index].experience = e.target.value;
                                setData({ ...data, skills: newSkill });
                              }}
                            />
                          </div>
                        );
                      })}
                      <div
                        onClick={() => {
                          setData({
                            ...data,
                            skills: [
                              ...data.skills,
                              { skill: "", experience: "" },
                            ],
                          });
                        }}
                        className="d-flex justify-content-end text-primary cursor-pointer"
                      >
                        + Add Another Skill
                      </div>
                    </Form.Group>
                  </div>
                )}
              </Tab>
              <Tab
                eventKey="questions"
                title="Screening Questions"
                className="d-flex justify-content-center"
                disabled
              >
                {key === "questions" && (
                  <div className={isSmall ? "w-100 px-5" : "w-50"}>
                    <h5 className="mb-4">
                      Applicant Must Answer Each Question
                    </h5>
                    {data.questions.map((x, index) => {
                      return (
                        <div>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Write Question Here</Form.Label>
                            <Form.Control value={x.question} type="text"
                               onChange={(e) => {
                                const newQuestion = [...data.questions];
                                newQuestion[index].question = e.target.value;
                                setData({ ...data, questions: newQuestion });
                              }}                           
                            />
                          </Form.Group>
                          <div className="d-flex justify-content-between align-items-center">
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Answer Type</Form.Label>
                              <Form.Select 
                               onChange={(e) => {
                                const newQuestion = [...data.questions];
                                newQuestion[index].type = e.target.value;
                                setData({ ...data, questions: newQuestion });
                              }}                                
                              value={x.type} aria-label="Default select example">
                                <option></option>
                                <option value="Yes/No">Yes/No</option>
                                <option value="Numbers">Numbers</option>
                                <option value="One Line">One Line</option>
                              </Form.Select>
                            </Form.Group>
                            <Form.Group
                              className="mb-3 ms-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Check
                                className="d-flex align-items-center"
                                type="checkbox"
                                label="Must Have Qualification"
                                onChange={(e) => {
                                  const newQuestion = [...data.questions];
                                  newQuestion[index].mustHave = e.target.checked;
                                  setData({ ...data, questions: newQuestion });
                                }}  
                              />
                            </Form.Group>
                          </div>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Ideal Answer</Form.Label>
                            <Form.Control 
                               onChange={(e) => {
                                const newQuestion = [...data.questions];
                                newQuestion[index].answer = e.target.value;
                                setData({ ...data, questions: newQuestion });
                              }}                              
                            value={x.answer} type="text" />
                          </Form.Group>
                        </div>
                      );
                    })}
                    <div
                      onClick={() => {
                        setData({
                          ...data,
                          questions: [
                            ...data.questions,
                            {
                              question: "",
                              type: "",
                              mustHave: false,
                              answer: "",
                            },
                          ],
                        });
                      }}
                      className="d-flex justify-content-end mt-2 text-primary cursor-pointer"
                    >
                      + Add Question
                    </div>
                  </div>
                )}
              </Tab>
              <Tab
                eventKey="payout"
                title="Payout Details"
                className="d-flex justify-content-center"
                disabled
              >
                {key === "payout" && (
                  <div className={isSmall ? "w-100 px-5" : "w-50"}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Annual CTC Range</Form.Label>
                      <Form.Select onChange={handleChange} name="range" value={data.range} aria-label="Default select example">
                        <option></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Minimum CTC</Form.Label>
                        <Form.Control onChange={handleChange} name="ctc" value={data.ctc} type="text" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 ms-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Maximum Budget</Form.Label>
                        <Form.Control onChange={handleChange} name="budget" value={data.budget} type="text" />
                      </Form.Group>
                    </div>
                    <div className="d-flex justify-content-between align-items-end mt-2">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>No. Of Vacancies</Form.Label>
                        <Form.Control onChange={handleChange} name="vacancies" value={data.vacancies} type="text" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 ms-3"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>No. Of Application Required</Form.Label>
                        <Form.Control onChange={handleChange} name="applications" value={data.applications} type="text" />
                      </Form.Group>
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Fulfillment Payout</Form.Label>
                      <div className="mt-1 mb-3">
                        <Form.Check
                          inline
                          label="Percentage"
                          name="percentage"
                          type="radio"
                          id="inline-radio-1"
                          checked={payout === "percentage"}
                          onChange={() => setPayout('percentage')}
                        />
                        <Form.Check
                          inline
                          label="Fixed Payout"
                          name="fixed"
                          type="radio"
                          id="inline-radio-2"
                          checked={payout === "fixed"}
                          onChange={() => setPayout('fixed')}
                        />
                      </div>
                      <Form.Control onChange={handleChange} name="payout" value={data.payout} type="text"
                        placeholder={payout==="percentage" ? "% of annual CTC" : null}
                      />
                    </Form.Group>
                  </div>
                )}
              </Tab>
              <Tab
                eventKey="review"
                title="Review and Submit"
                className="d-flex justify-content-center"
                disabled
              >
                {key === "review" && (
                  <div className={isSmall ? "w-100 px-5" : "w-50"}>
                    <h5>{data.title}</h5>
                    <p>{data.country}, {data.city}</p>
                    <p>{data.workplace}</p>
                    <p>{data.type}</p>
                    <h5>Details</h5>
                    <p>{data.description}</p>
                    <p>{data.qualifications}</p>
                    {data.skills.map((x) => {
                        return(<p>{x.skill}, {x.experience}</p>)
                    })}
                    <h5>Questions</h5>
                    {data.questions.map((x) => {
                        return(<div>
                            <p>{x.question}</p>
                            <p>{x.answer}</p>
                            </div>)
                    })}
                    <h5>Payout Details</h5>
                    <p>{data.vacancies}</p>
                    <p>{data.applications}</p>
                    <p>{data.range}</p>
                    <p>{data.ctc}-{data.budget}</p>
                    <p>{data.payout}</p>
                  </div>
                )}
              </Tab>
            </Tabs>
            {err && <div className="mb-2">{err}</div>}
            <div className="d-flex justify-content-center">
              <div className="mb-3 d-flex">
                <Button
                  onClick={handleBack}
                  className="border-black"
                  variant="light"
                  disabled={key === "post" ? true : false}
                >
                  {key === "home"
                    ? "Cancel"
                    : key === "home"
                    ? "Back to exit"
                    : "Back"}
                </Button>
                <Button className='ms-3' disabled>Save To Draft</Button>
                <Button className='ms-3' onClick={key==='review' ? handleSubmit : handleNext}>
                  {key === "post"
                    ? "Start Job Post"
                    : key === "review"
                    ? "Save Job"
                    : "Save and Next"}
                </Button>
              </div>
            </div>
            </>}
          </div>
          {!isSmall && <div className="bg h-100 w-25"></div>}
          {isSmall && menu==='details' ? <MobileMenu setShowForm={setShowForm} setMenu={setMenu} /> : null}
        </div>
      </div>
    </div>
  )
}

export default Dashboard