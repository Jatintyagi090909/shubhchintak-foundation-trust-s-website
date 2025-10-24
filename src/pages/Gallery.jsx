import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';


const Gallery = () => {
  // Gallery images data
  const allImages = [
    { id: 1, category: 'blanket', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612138/images/blanket1_tzyaoh.jpg', title: '' },
    { id: 2, category: 'blanket', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612139/images/blanket2_ckhlrm.jpg', title: '' },     // { id: , category: '', image: '', title: ''},
    { id: 3, category: 'blanket', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612140/images/blanket3_j8l73a.jpg', title: '' },
    { id: 4, category: 'blanket', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612140/images/blanket4_tupm1a.jpg', title: '' },
    { id: 5, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612459/images/ration1_lg3mjb.jpg', title: '' },
    { id: 6, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612485/images/ration2_ltomjg.jpg', title: '' },
    { id: 7, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612511/images/ration3_nadvhk.jpg', title: '' },
    { id: 8, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612513/images/ration4_cphsyx.jpg', title: '' },
    { id: 9, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612514/images/ration5_zyqpd5.jpg', title: '' },
    { id: 10, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612516/images/ration6_zpozkb.jpg', title: '' },
    { id: 11, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612516/images/ration7_tgan47.jpg', title: '' },
    { id: 12, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612519/images/ration8_dlugve.jpg', title: '' },
    { id: 13, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612520/images/ration9_sdcb2s.jpg', title: ''},
    { id: 14, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612457/images/ration10_ljyst1.jpg', title: ''},
    { id: 15, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612460/images/ration11_kzbpqx.jpg', title: ''},
    { id: 16, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612462/images/ration12_w4euq7.jpg', title: ''},
    { id: 17, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612463/images/ration13_zfsg4u.jpg', title: ''},
    { id: 18, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612467/images/ration14_l8ivut.jpg', title: ''},
    { id: 19, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612473/images/ration15_xhtphw.jpg', title: ''},
    { id: 20, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612477/images/ration16_ai6vri.jpg', title: ''},
    { id: 21, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612484/images/ration17_m4paeh.jpg', title: ''},
    { id: 22, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612478/images/ration18_ztswqq.jpg', title: ''},
    { id: 23, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612484/images/ration19_c5olav.jpg', title: ''},
    { id: 24, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612488/images/ration20_hldjva.jpg', title: ''},
    { id: 25, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612489/images/ration21_polx0v.jpg', title: ''},
    { id: 26, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612488/images/ration22_lr8v1x.jpg', title: ''},
    { id: 27, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612492/images/ration23_qjtsv8.jpg', title: ''},
    { id: 28, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612492/images/ration24_iizogw.jpg', title: ''},
    { id: 29, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612495/images/ration25_or887q.jpg', title: ''},
    { id: 30, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612505/images/ration26_oe2pat.jpg', title: ''},
    { id: 31, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612499/images/ration27_snek35.jpg', title: ''},
    { id: 32, category: 'ration', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612505/images/ration28_imphau.jpg', title: ''},
    { id: 33, category: 'environment', image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612144/images/enviroment1_ftubz0.jpg', title: ''},
    { id: 34, category: 'environment', image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612157/images/enviroment2_miywoq.jpg', title: ''},
    { id: 35, category: 'environment', image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612202/images/enviroment3_we1qas.jpg', title: ''},
    { id: 36, category: 'environment', image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612386/images/enviroment4_dykqgk.jpg', title: ''},
    { id: 37, category: 'environment', image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612377/images/enviroment5_n9rwqt.jpg', title: ''},
    { id: 38, category: 'environment', image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612428/images/enviroment6_q2kum8.jpg', title: ''},
    { id: 39, category: 'environment', image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612565/images/enviroment7_ztxjwm.jpg', title: ''},
    { id: 40, category: 'environment', image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612565/images/enviroment8_lbt8db.jpg', title: ''},
    { id: 41, category: 'environment', image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612468/images/enviroment9_njwwzl.jpg', title: ''},
    { id: 42, category: 'environment', image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612302/images/enviroment10_kvaew4.jpg', title: ''},
    { id: 43, category: 'environment', image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612240/images/enviroment11_gjb7op.jpg', title: ''},
    { id: 44, category: 'environment', image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612776/images/enviroment12_piigsd.jpg', title: ''},
    { id: 45, category: 'environment', image: 'https://res.cloudinary.com/dygzdptij/image/upload/q_60,f_auto/v1745612498/images/enviroment13_gyiwai.jpg', title: ''},
    { id: 46, category: 'education', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612531/images/teacherday1_zmsr1b.jpg', title: ''},
    { id: 47, category: 'education', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612526/images/teacherday2_a1zfpo.jpg', title: ''},
    { id: 48, category: 'education', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612533/images/teachersday3_srbdso.jpg', title: ''},
    { id: 49, category: 'education', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612529/images/teacherday4_ykpciz.jpg', title: ''},
    { id: 50, category: 'education', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612532/images/teacherday5_rtscwr.jpg', title: ''},
    { id: 51, category: 'sports', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612520/images/sportsday1_lisirz.jpg', title: ''},
    { id: 52, category: 'sports', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612521/images/sportsday2_u98jny.jpg', title: ''},
    { id: 53, category: 'sports', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612529/images/sportsday3_iy732t.jpg', title: ''},
    { id: 54, category: 'sports', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612530/images/sportsday4_gdrtq1.jpg', title: ''},
    { id: 55, category: 'sports', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612523/images/sportsday5_oe5xk3.jpg', title: ''},
    { id: 56, category: 'news', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612443/images/news1_rvcb2a.jpg', title: ''},
    { id: 57, category: 'news', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612447/images/news2_cyuajs.jpg', title: ''},
    { id: 58, category: 'news', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612448/images/news3_whlsz5.jpg', title: ''},
    { id: 59, category: 'news', image: 'https://res.cloudinary.com/dygzdptij/image/upload/v1745612453/images/news4_xka3mb.jpg', title: ''},
  ];

  // Filter descriptions
  const filterDescriptions = {
    all: "View all our initiatives across various categories. Explore our complete collection of impactful moments and events organized by Shubhchintak Foundation Trust.",
    blanket: "Our blanket distribution drives aim to provide warmth and comfort to homeless and underprivileged people during winter months. Each year, we reach out to hundreds of people living on streets.",
    ration: "Through our ration distribution programs, we provide essential food supplies to families in need. These initiatives ensure that underprivileged families have access to basic nutrition.",
    environment: "Our environmental initiatives focus on creating a sustainable future through tree plantation, awareness campaigns, and clean-up drives to protect our planet.",
    education: "We believe education is a fundamental right. Our education programs support underprivileged children with resources, scholarships, and learning materials.",
    sports: "Our sports initiatives aim to promote physical fitness, teamwork, and healthy competition among children from all backgrounds.",
    news: "Stay updated with our latest news, press releases, and announcements. Learn about our new initiatives, achievements, and upcoming events.",
    others: "Various other community welfare activities that don't fall under specific categories but contribute significantly to our mission."
  };

  const location = useLocation();

  // Filter states
  const [activeFilter, setActiveFilter] = useState('all');
  const [images, setImages] = useState(allImages);
  const [description, setDescription] = useState(filterDescriptions.all);

  // Filter function
  const filterImages = (category) => {
    console.log('Filtering images by category:', category); // Debug log

    setActiveFilter(category);
    setDescription(filterDescriptions[category] || filterDescriptions.all);

    if (category === 'all') {
      setImages(allImages);
    } else {
      const filtered = allImages.filter(image => image.category === category);
      console.log(`Found ${filtered.length} images for category "${category}"`); // Debug log
      setImages(filtered);
    }
  };

  // Apply filter from URL when component mounts or URL changes
  useEffect(() => {
    console.log('Location changed:', location.search); // Debug log

    const queryParams = new URLSearchParams(location.search);
    const filterParam = queryParams.get('filter');

    console.log('URL filter parameter:', filterParam); // Debug log

    if (filterParam && Object.keys(filterDescriptions).includes(filterParam)) {
      console.log('Applying filter from URL:', filterParam); // Debug log
      // Use setTimeout to ensure this runs after component is fully mounted
      setTimeout(() => {
        filterImages(filterParam);
      }, 0);
    }
  }, [location.search]); // Only re-run when search params change

  return (
    <>
      {/* Breadcrumbs */}
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Gallery</h2>
            <ol>
              <li><Link to="/">Home</Link></li>
              <li>Gallery</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery section-bg">
        <div className="container">
          <div className="section-title text-center mb-1" data-aos="fade-up">
            <h2><strong>Our Gallery</strong></h2>
            <p>Photos from our initiatives and events</p>
          </div>

          <div className="row mb-4" data-aos="fade-up">
            <div className="col-12 text-center">
              <ul className="list-inline gallery-filters">
                <li className="list-inline-item">
                  <button
                    className={`btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => filterImages('all')}
                    style={{
                      backgroundColor: activeFilter === 'all' ? '#fd5c28' : 'transparent',
                      borderColor: '#fd5c28',
                      color: activeFilter === 'all' ? 'white' : '#fd5c28'
                    }}
                  >
                    All
                  </button>
                </li>
                <li className="list-inline-item">
                  <button
                    className={`btn ${activeFilter === 'blanket' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => filterImages('blanket')}
                    style={{
                      backgroundColor: activeFilter === 'blanket' ? '#fd5c28' : 'transparent',
                      borderColor: '#fd5c28',
                      color: activeFilter === 'blanket' ? 'white' : '#fd5c28'
                    }}
                  >
                    Blanket Distribution
                  </button>
                </li>
                <li className="list-inline-item">
                  <button
                    className={`btn ${activeFilter === 'ration' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => filterImages('ration')}
                    style={{
                      backgroundColor: activeFilter === 'ration' ? '#fd5c28' : 'transparent',
                      borderColor: '#fd5c28',
                      color: activeFilter === 'ration' ? 'white' : '#fd5c28'
                    }}
                  >
                    Ration-kit
                  </button>
                </li>
                <li className="list-inline-item">
                  <button
                    className={`btn ${activeFilter === 'environment' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => filterImages('environment')}
                    style={{
                      backgroundColor: activeFilter === 'environment' ? '#fd5c28' : 'transparent',
                      borderColor: '#fd5c28',
                      color: activeFilter === 'environment' ? 'white' : '#fd5c28'
                    }}
                  >
                    Environmental Day
                  </button>
                </li>
                <li className="list-inline-item">
                  <button
                    className={`btn ${activeFilter === 'education' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => filterImages('education')}
                    style={{
                      backgroundColor: activeFilter === 'education' ? '#fd5c28' : 'transparent',
                      borderColor: '#fd5c28',
                      color: activeFilter === 'education' ? 'white' : '#fd5c28'
                    }}
                  >
                    Teachers Day
                  </button>
                </li>
                <li className="list-inline-item">
                  <button
                    className={`btn ${activeFilter === 'sports' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => filterImages('sports')}
                    style={{
                      backgroundColor: activeFilter === 'sports' ? '#fd5c28' : 'transparent',
                      borderColor: '#fd5c28',
                      color: activeFilter === 'sports' ? 'white' : '#fd5c28'
                    }}
                  >
                    Sports Day
                  </button>
                </li>
                <li className="list-inline-item">
                  <button
                    className={`btn ${activeFilter === 'news' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => filterImages('news')}
                    style={{
                      backgroundColor: activeFilter === 'news' ? '#fd5c28' : 'transparent',
                      borderColor: '#fd5c28',
                      color: activeFilter === 'news' ? 'white' : '#fd5c28'
                    }}
                  >
                    News
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Filter Description */}
          <div className="row mb-5" data-aos="fade-up">
            <div className="col-12">
              <div
                className="filter-description text-center p-3"
                style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  borderLeft: '4px solid #fd5c28',
                  transition: 'all 0.3s ease'
                }}
              >
                <p className="mb-0">{description}</p>
              </div>
            </div>
          </div>

          <div className="row gallery-container" data-aos="fade-up">
            {images.length > 0 ? (
              images.map((image) => (
                <div key={image.id} className="col-lg-4 col-md-6 gallery-item mb-4">
                  <div className="gallery-wrap shadow">
                    <img src={image.image} className="img-fluid" alt={image.title} />
                    <div className="gallery-info">
                      <h4>{image.title}</h4>
                      <div className="gallery-links">
                        <a href={image.image} title={image.title} className="gallery-lightbox">
                          <i className="fas fa-eye"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h4>No images found for this category.</h4>
                <button
                  className="btn mt-3"
                  onClick={() => filterImages('all')}
                  style={{ backgroundColor: '#fd5c28', color: 'white' }}
                >
                  Show All Images
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
