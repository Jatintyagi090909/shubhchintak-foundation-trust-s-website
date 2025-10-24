export const ResponsiveStyles = () => {
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

  return <style>{globalStyles}</style>;
};