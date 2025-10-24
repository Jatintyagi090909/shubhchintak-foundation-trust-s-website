import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FadeInSection from '../components/FadeInSection';

const About = () => {
  const globalStyles = `
    /* Global styles to fix mobile overflow issues */
    @media (max-width: 767.98px) {
      .container {
        max-width: 100%;
        padding-left: 15px;
        padding-right: 15px;
        overflow-x: hidden;
      }

      body, html {
        overflow-x: hidden;
        max-width: 100%;
      }

      .row {
        margin-left: -10px;
        margin-right: -10px;
      }

      .row > [class*='col-'] {
        padding-left: 10px;
        padding-right: 10px;
      }

      .table-responsive {
        max-width: 100%;
      }

      .card {
        width: 100%;
      }

      h2, h3, h4 {
        word-wrap: break-word;
      }

      .member {
        margin-bottom: 15px;
      }
    }

    /* Team search results mobile styling */
    @media (max-width: 575.98px) {
      .team-search-card {
        margin-bottom: 1.5rem;
      }
      .team-search-card .card-img-top {
        max-height: 180px !important;
      }
      .team-search-results .row > [class*='col-'] {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
      }
    }
  `;
  // All team members data
  const allTeamData = {
    
    foundationMembers: [
      {
        id: 1,
        name: 'Dr. Neelam Jain',
        position: 'Founder & President',
        department: 'Foundation Members',
        image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745765499/images/Sample_tr12ub.png',
        bio: 'Dr. Neelam Jain is the visionary behind Shubhchintak Foundation Trust with over 15 years of experience in social work. She believes in creating sustainable impact through grassroots initiatives.'
      },
      {
        id: 2,
        name: 'Mr. Upshrenik Kumar',
        position: 'Secretary',
        department: 'Foundation Members',
        image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745765499/images/Sample_tr12ub.png',
        bio: 'Mr. Upshrenik Kumar has dedicated his career to non-profit management and brings valuable organizational expertise to ensure the Trust operates efficiently and transparently.'
      },
      {
        id: 3,
        name: 'Dr. Mamta',
        position: 'Treasurer',
        department: 'Foundation Members',
        image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745765499/images/Sample_tr12ub.png',
        bio: 'Dr. Mamta oversees financial operations of the Trust. With her background in finance, she ensures all donations are used effectively for maximum community impact.'
      },
      {
        id: 4,
        name: 'Akshay Jain',
        position: 'Vice President',
        department: 'Foundation Members',
        image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745765499/images/Sample_tr12ub.png',
        bio: 'Akshay Jain leads program development and implementation. His innovative approach helps the Trust create sustainable solutions for community challenges.'
      },
      {
        id: 5,
        name: 'Ashish Kumar',
        position: 'Delhi & NCR Outreach Manager',
        department: 'Foundation Members',
        image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745765499/images/Sample_tr12ub.png',
        bio: 'Ashish Kumar coordinates all Delhi & NCR operations, building valuable community relationships and ensuring successful program implementation in the region.'
      },
      {
        id: 6,
        name: 'Akhil Kumar "Lavi"',
        position: 'Northern India Relationship Manager',
        department: 'Foundation Members',
        image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745765499/images/Sample_tr12ub.png',
        bio: 'Akhil Kumar expands the Trust\'s reach across Northern India, developing partnerships with local organizations and government bodies to enhance program impact.'
      }
    ],
    humanResources: [
      { id: 7, name: 'Nilesh Rai', position: '', department: 'Human Resources' },
      { id: 8, name: 'Anshuman Ghazta', position: '', department: 'Human Resources' },
      { id: 9, name: 'Priyanshi', position: '', department: 'Human Resources' },
      { id: 10, name: 'Shwetha Nampelli', position: '', department: 'Human Resources' },
      { id: 11, name: 'Pranab Roy', position: '', department: 'Human Resources' }
    ],
    webDevelopers: [
      { id: 12, name: 'Suhas N Kashyap', position: '', department: 'Web Developers' },
      { id: 13, name: 'B Ikshwak', position: '', department: 'Web Developers' },
      { id: 14, name: 'Deepak C', position: '', department: 'Web Developers' },
      { id: 15, name: 'Kedar Mayekar', position: '', department: 'Web Developers' },
      { id: 16, name: 'Aneesha Bhattartiri', position: '', department: 'Web Developers' },
      { id: 17, name: 'Ritika', position: '', department: 'Web Developers' },
      { id: 18, name: 'Jatin Tyagi', position: '', department: 'Web Developers' }
    ],
    mobileAppDevelopers: [
      { id: 19, name: 'Abhishek pandey', position: '', department: 'Mobile Application Developer' }
    ],
    contentWriters: [
      { id: 20, name: 'Priya Negi', position: '', department: 'Content Writers' },
      { id: 21, name: 'P S Karpaga Priya', position: '', department: 'Content Writers' },
      { id: 22, name: 'Anupama Kumari', position: '', department: 'Content Writers' }
    ],
    marketing: [
      { id: 23, name: 'Ayush Srivastav', position: '', department: 'Marketing' }
    ],
    legalTeam: [
      { id: 24, name: 'Anantha Narayanan', position: '', department: 'Legal Team' },
      { id: 25, name: 'Khushi', position: '', department: 'Legal Team' }
    ],
    graphicsTeam: [
      { id: 26, name: 'Bishal Chand', position: '', department: 'Graphics Designer team' }
    ]
  };

  // Foundation Details
  const foundationDetails = {
    name: "Shubhchintak Foundation Trust",
    established: "2020",
    registrationNumber: "SFTRG123456789",
    taxExemptionStatus: "12345",
    fcraRegistration: "12345",
    registeredAddress: "Pune - 411013 India",
    phoneNumber:"+917385509098",
    email: "admin@shubhchintaktrust.com",
    website: "www.shubhchintaktrust.com/"
  };

  // Core Values
  const coreValues = [
    {
      title: "Integrity",
      description: "We operate with honesty, transparency, and ethical practices in all our endeavors.",
      icon: "fas fa-balance-scale"
    },
    {
      title: "Compassion",
      description: "We approach our work with empathy and kindness, recognizing the dignity of those we serve.",
      icon: "fas fa-heart"
    },
    {
      title: "Inclusivity",
      description: "We embrace diversity and ensure our programs serve all people regardless of background.",
      icon: "fas fa-users"
    },
    {
      title: "Innovation",
      description: "We seek creative solutions and continuously improve our approaches to address challenges.",
      icon: "fas fa-lightbulb"
    },
    {
      title: "Sustainability",
      description: "We develop programs that create lasting change while respecting environmental balance.",
      icon: "fas fa-seedling"
    },
    {
      title: "Collaboration",
      description: "We believe in the power of partnerships to multiply our impact and reach.",
      icon: "fas fa-hands-helping"
    }
  ];

  // Flatten all team members for search
  const allMembers = Object.values(allTeamData).flat();

  // State for storing data and search results
  const [teamData, setTeamData] = useState(allTeamData);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [showAllDepartments, setShowAllDepartments] = useState(true);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  // Add this new state to control visibility of page sections
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Handle search
  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);

    if (!searchTerm.trim()) {
      setTeamData(allTeamData);
      setSearchResults(null);
      setShowAllDepartments(true);
      setIsSearchMode(false);  // Show all sections when search is empty
      return;
    }

    setIsSearchMode(true);  // Hide other sections when search has value

    const searchTextLower = searchTerm.toLowerCase();
    const matchingMembers = allMembers.filter(member =>
      member.name.toLowerCase().includes(searchTextLower) ||
      (member.position && member.position.toLowerCase().includes(searchTextLower)) ||
      member.department.toLowerCase().includes(searchTextLower)
    );

    // Create a filtered team data object with only the matching members
    const departments = [...new Set(matchingMembers.map(member => member.department))];
    setFilteredDepartments(departments);

    const filteredData = {};
    Object.keys(allTeamData).forEach(key => {
      const departmentMembers = allTeamData[key].filter(member =>
        member.name.toLowerCase().includes(searchTextLower) ||
        (member.position && member.position.toLowerCase().includes(searchTextLower)) ||
        member.department.toLowerCase().includes(searchTextLower)
      );

      if (departmentMembers.length > 0) {
        filteredData[key] = departmentMembers;
      }
    });

    setTeamData(filteredData);
    setShowAllDepartments(false);
    setSearchResults({
      term: searchTerm,
      count: matchingMembers.length
    });
  };

  const resetSearch = () => {
    setSearchQuery('');
    setTeamData(allTeamData);
    setSearchResults(null);
    setShowAllDepartments(true);
    setIsSearchMode(false);  // Show all sections when search is reset
  };

  // Check if a department should be displayed
  const shouldDisplayDepartment = (departmentKey) => {
    if (showAllDepartments) return true;
    return Object.keys(teamData).includes(departmentKey);
  };

  return (
    <>
    <style>{globalStyles}</style>
      {/* Breadcrumbs */}
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2>About</h2>
            <ol>
              <li><Link to="/">Home</Link></li>
              <li>About</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Search Bar*/}
      <section className="search-section py-3 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <SearchBar
                placeholder="Search members, departments, positions..."
                onSearch={handleSearch}
              />

              {searchResults && (
                <div className="search-results mt-2 text-center">
                  {searchResults.count > 0 ? (
                    <p>Found {searchResults.count} result{searchResults.count !== 1 ? 's' : ''} for "{searchResults.term}"</p>
                  ) : (
                    <p>No results found for "{searchResults.term}"</p>
                  )}
                  <button
                    className="btn btn-sm"
                    onClick={resetSearch}
                    style={{ backgroundColor: '#fd5c28', color: 'white' }}
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Show search results */}
      {isSearchMode && (
        <section id="team-search-results" className="team-search-results py-5">
          <div className="container">
            <div className="section-title text-center mb-5">
              <h2>Search Results</h2>
            </div>

            {Object.keys(teamData).length > 0 ? (
              Object.keys(teamData).map(departmentKey => {
                const departmentTitle = teamData[departmentKey][0]?.department || departmentKey;
                return (
                  <div key={departmentKey} className="mb-5">
                    <h3 className="headings text-center mb-4"><em>{departmentTitle}</em></h3>
                    <div className="row">
                      {teamData[departmentKey].map(member => (
                        <div key={member.id} className="col-lg-4 col-md-6 mb-4">
                          <div className="card team-search-card h-100 shadow-sm border-0">
                            {member.image && (
                              <img
                                src={member.image}
                                className="card-img-top"
                                alt={member.name}
                                style={{ height: '250px', objectFit: 'cover' }}
                              />
                            )}
                            <div className="card-body text-center">
                              <h4 className="card-title" style={{ color: '#333' }}>{member.name.toUpperCase()}</h4>
                              {member.position && (
                                <p className="card-subtitle mb-2" style={{ color: '#fd5c28', fontWeight: '500' }}>{member.position}</p>
                              )}
                              {member.bio && (
                                <p className="card-text">{member.bio}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-5">
                <h4>No team members found matching your search.</h4>
                <button
                  className="btn mt-3"
                  onClick={resetSearch}
                  style={{ backgroundColor: '#fd5c28', color: 'white' }}
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Only show the following sections when NOT in search mode */}
      {!isSearchMode && (
        <>
          {/* Overview Section */}
          <FadeInSection>
            <section id="overview" className="about-overview py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center mb-5">
                    <h2 data-aos="fade-up">About <strong className="text-primary">Shubhchintak Foundation Trust</strong></h2>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-lg-6" data-aos="fade-right">
                    <img src="https://res.cloudinary.com/dygzdptij/image/upload/v1745764915/images/story_wb402w.png" className="img-fluid rounded shadow" alt="About Shubhchintak Foundation" />
                  </div>
                  <div className="col-lg-6 pt-4 pt-lg-0" data-aos="fade-left">
                    <h3>Our Story</h3>
                    <p className="font-italic">
                      Established in 2020, Shubhchintak Foundation Trust was born from a vision to create a more equitable society through targeted humanitarian initiatives.
                    </p>
                    <p>
                      Starting with small-scale community projects in Pune-India, we have expanded our reach to multiple states across India. Our journey has been defined by a commitment to addressing critical needs in underserved communities through sustainable solutions.
                    </p>
                    <p>
                      Today, we work across multiple domains including food security, education, healthcare, and environmental sustainability. With a dedicated team of professionals and volunteers, we strive to create meaningful impact that transforms lives and communities.
                    </p>
                    <p>
                      Our approach combines grassroots engagement with strategic partnerships, ensuring that our interventions are both relevant to community needs and effective in creating lasting change.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* Vision and Mission Section */}
          <FadeInSection>
            <section id="vision-mission" className="vision-mission py-5 section-bg">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6" data-aos="fade-right">
                    <div className="card h-100 shadow-sm border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <div className="icon-box mr-3" style={{ backgroundColor: '#fd5c28', color: 'white', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}>
                            <i className="fas fa-eye fa-2x"></i>
                          </div>
                          <h3 className="card-title mb-0">Our Vision</h3>
                        </div>
                        <p className="card-text">
                          To create a society where every individual has access to basic necessities, quality education, and opportunities for growth, enabling them to lead dignified and fulfilling lives. We envision communities that are self-reliant, inclusive, and environmentally sustainable.
                        </p>
                        <p className="card-text">
                          We strive to be catalysts for positive social change, where compassionate action and innovation come together to address society's most pressing challenges.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6" data-aos="fade-left">
                    <div className="card h-100 shadow-sm border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <div className="icon-box mr-3" style={{ backgroundColor: '#fd5c28', color: 'white', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}>
                            <i className="fas fa-bullseye fa-2x"></i>
                          </div>
                          <h3 className="card-title mb-0">Our Mission</h3>
                        </div>
                        <p className="card-text">
                          To implement sustainable programs that address fundamental human needs, promote education, foster community development, and protect the environment. We are committed to:
                        </p>
                        <ul>
                          <li>Providing essential supplies to vulnerable populations</li>
                          <li>Supporting educational initiatives for underprivileged children</li>
                          <li>Building community resilience through targeted interventions</li>
                          <li>Advocating for social justice and environmental responsibility</li>
                          <li>Creating platforms for civic engagement and volunteerism</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* Core Values Section */}
          <FadeInSection>
            <section id="core-values" className="core-values py-5">
              <div className="container">
                <div className="section-title text-center mb-5" data-aos="fade-up">
                  <h2><strong>Our Core Values</strong></h2>
                  <p>The principles that guide our work and define our organization's culture</p>
                </div>

                <div className="row">
                  {coreValues.map((value, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
                      <div className="card h-100 value-card shadow-sm border-0">
                        <div className="card-body text-center p-4">
                          <div className="icon-circle mb-3" style={{ backgroundColor: '#f8f9fa', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
                            <i className={`${value.icon} fa-2x`} style={{ color: '#fd5c28' }}></i>
                          </div>
                          <h4 className="card-title">{value.title}</h4>
                          <p className="card-text">{value.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* Foundation Team Section with Images and Bios */}
          <FadeInSection>
            <section id="foundation-team" className="foundation-team py-5 section-bg">
              <div className="container">
                <div className="section-title text-center mb-5" data-aos="fade-up">
                  <h2><strong>Foundation Leadership</strong></h2>
                  <p>Meet the dedicated team leading our mission to create positive change</p>
                </div>

                <div className="row">
                  {allTeamData.foundationMembers.map((member, index) => (
                    <div key={member.id} className="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
                      <div className="card team-card h-100 shadow-sm border-0">
                        <img
                          src={member.image}
                          className="card-img-top"
                          alt={member.name}
                          style={{ height: '250px', objectFit: 'cover' }}
                        />
                        <div className="card-body text-center">
                          <h4 className="card-title" style={{ color: '#333' }}>{member.name.toUpperCase()}</h4>
                          <p className="card-subtitle mb-2" style={{ color: '#fd5c28', fontWeight: '500' }}>{member.position}</p>
                          <p className="card-text">{member.bio}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </FadeInSection>
        </>
      )}

      {/* Team Section */}
      <section id="team" className="team section-bg">
        <div className="container">
          <div className="section-title" data-aos="zoom-out">
            <h3>Our <strong>Team</strong></h3>
            <p>The Shubhchintak Team comprises of people from different walks of life who have all come together with their varied experiences to work towards one mission.</p>
          </div>

          {/* Human Resources */}
          {shouldDisplayDepartment('humanResources') && (
            <>
              <h3 className="headings text-center" data-aos="zoom-out"><em>Human Resources</em></h3>
              <div className="row justify-content-center">
                {teamData.humanResources && teamData.humanResources.map(member => (
                  <div key={member.id} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                    <div className="member" data-aos="zoom-in">
                      <div className="member-info">
                        <h4>{member.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Web Developers */}
          {shouldDisplayDepartment('webDevelopers') && (
            <>
              <h3 className="headings text-center" data-aos="zoom-out"><em>Web Developers</em></h3>
              <div className="row justify-content-center">
                {teamData.webDevelopers && teamData.webDevelopers.map(member => (
                  <div key={member.id} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                    <div className="member" data-aos="zoom-in">
                      <div className="member-info">
                        <h4>{member.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Mobile App Developers */}
          {shouldDisplayDepartment('mobileAppDevelopers') && (
            <>
              <h3 className="headings text-center" data-aos="zoom-out"><em>Mobile Application Developer</em></h3>
              <div className="row justify-content-center">
                {teamData.mobileAppDevelopers && teamData.mobileAppDevelopers.map(member => (
                  <div key={member.id} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                    <div className="member" data-aos="zoom-in">
                      <div className="member-info">
                        <h4>{member.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Content Writers */}
          {shouldDisplayDepartment('contentWriters') && (
            <>
              <h3 className="headings text-center" data-aos="zoom-out"><em>Content Writers</em></h3>
              <div className="row justify-content-center">
                {teamData.contentWriters && teamData.contentWriters.map(member => (
                  <div key={member.id} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                    <div className="member" data-aos="zoom-in">
                      <div className="member-info">
                        <h4>{member.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Marketing */}
          {shouldDisplayDepartment('marketing') && (
            <>
              <h3 className="headings text-center" data-aos="zoom-out"><em>Marketing</em></h3>
              <div className="row justify-content-center">
                {teamData.marketing && teamData.marketing.map(member => (
                  <div key={member.id} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                    <div className="member" data-aos="zoom-in">
                      <div className="member-info">
                        <h4>{member.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Legal Team */}
          {shouldDisplayDepartment('legalTeam') && (
            <>
              <h3 className="headings text-center" data-aos="zoom-out"><em>Legal Team</em></h3>
              <div className="row justify-content-center">
                {teamData.legalTeam && teamData.legalTeam.map(member => (
                  <div key={member.id} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                    <div className="member" data-aos="zoom-in">
                      <div className="member-info">
                        <h4>{member.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Graphics Team */}
          {shouldDisplayDepartment('graphicsTeam') && (
            <>
              <h3 className="headings text-center" data-aos="zoom-out"><em>Graphics Designer team</em></h3>
              <div className="row justify-content-center">
                {teamData.graphicsTeam && teamData.graphicsTeam.map(member => (
                  <div key={member.id} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                    <div className="member" data-aos="zoom-in">
                      <div className="member-info">
                        <h4>{member.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {Object.keys(teamData).length === 0 && (
            <div className="text-center py-5">
              <h4>No team members found matching your search.</h4>
              <button
                className="btn mt-3"
                onClick={resetSearch}
                style={{ backgroundColor: '#fd5c28', color: 'white' }}
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Only show the following section when NOT in search mode */}
      {!isSearchMode && (
        <FadeInSection>
          <section id="foundation-details" className="foundation-details py-5">
  <div className="container">
    <div className="section-title mb-5 text-center" data-aos="fade-up">
      <div className="d-flex align-items-center justify-content-center flex-column flex-md-row">
        <div className="circular-image mb-3 mb-md-0 mr-md-4" style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #fd5c28',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          flexShrink: 0
        }}>
          <img
            src="https://res.cloudinary.com/dygzdptij/image/upload/v1745647089/images/building_fsnj2u.jpg"
            alt="Foundation Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        <div className="text-center text-md-left">
          <h2><strong>Foundation Details</strong></h2>
          <p className="mb-0">Official registration and contact information</p>
        </div>
      </div>
    </div>

    <div className="row justify-content-center">
      <div className="col-lg-10 col-md-12" data-aos="fade-up">
        <div className="card shadow-sm border-0">
          <div className="card-body p-3 p-md-4">
            <div className="table-responsive">
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th scope="row" className="text-nowrap"><i className="fas fa-building mr-2" style={{ color: '#fd5c28' }}></i>Organization Name:</th>
                    <td>{foundationDetails.name}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-nowrap"><i className="fas fa-calendar-alt mr-2" style={{ color: '#fd5c28' }}></i>Established:</th>
                    <td>{foundationDetails.established}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-nowrap"><i className="fas fa-file-alt mr-2" style={{ color: '#fd5c28' }}></i>Registration Number:</th>
                    <td>{foundationDetails.registrationNumber}</td>
                  </tr>
              
                 {/* <tr>
                    <th scope="row" className="text-nowrap"><i className="fas fa-globe mr-2" style={{ color: '#fd5c28' }}></i>FCRA Registration:</th>
                    <td>{foundationDetails.fcraRegistration}</td>
                  </tr>*/}
                  <tr>
                    <th scope="row" className="text-nowrap"><i className="fas fa-map-marker-alt mr-2" style={{ color: '#fd5c28' }}></i>Registered Address:</th>
                    <td className="text-break">{foundationDetails.registeredAddress}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-nowrap"><i className="fas fa-phone mr-2" style={{ color: '#fd5c28' }}></i>Phone Number:</th>
                    <td><a href={`tel:${foundationDetails.phoneNumber}`} style={{ color: '#fd5c28' }}>{foundationDetails.phoneNumber}</a></td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-nowrap"><i className="fas fa-envelope mr-2" style={{ color: '#fd5c28' }}></i>Email:</th>
                    <td className="text-break"><a href={`mailto:${foundationDetails.email}`} style={{ color: '#fd5c28' }}>{foundationDetails.email}</a></td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-nowrap"><i className="fas fa-globe-asia mr-2" style={{ color: '#fd5c28' }}></i>Website:</th>
                    <td className="text-break"><a href={`https://${foundationDetails.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#fd5c28' }}>{foundationDetails.website}</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </FadeInSection>
      )}
    </>
  );
};

export default About;
