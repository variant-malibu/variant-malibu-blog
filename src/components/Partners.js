import React, {useEffect, useState} from 'react'

function Partners() {
  const [partners, setPartners] = useState([])
  useEffect(()=>{
    getPartners()
  },[])

  const getPartners = async () => {
    try {

      const res = await fetch(process.env.REACT_APP_BACKEND + '/partners')
      const data = await res.json()
      const result = data.map(partner => {
        return {
          id: partner.id,
          name: partner["Name"],
          description: partner["Description"],
          imgUrl: partner["Image"].url
        }
      })
      setPartners(result)
    } catch (err) {
      console.error(err)
    }

  }

  const displaypProjects = () => {
    const projects = partners.map( (project, idx ) => {
      return (
        <React.Fragment key={idx}>
          <hr/>
          <div className="project" key={project.id}>
            <div className="container-1">
              <h1>{project.name}</h1>
              <img src={project.imgUrl} className="sm" alt="partner-img"/>
              <p className="description">{project.description}</p>
            </div>
            <div className="container-2">
              <img src={project.imgUrl} className="lg" alt="partner-img"/>
            </div>
          </div>
        </React.Fragment>
      )
    })
    return projects

  }
  return (
    <div id="partners" className="content-wrapper">
      <div className="banner-wrapper">
        <div className="sliding-banner partners"></div>
      </div>
      <p className="lead">Variant’s platform was made for collaboraton. By partnering with companies and brands, we develop custom creative solutions and products tailored to meet your needs. </p>
      <div className="partners-section">
        { displaypProjects() }
      </div>
    </div>
  )
}

export default Partners
