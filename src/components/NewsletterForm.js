import React, {useState} from 'react'
import axios from 'axios'

const NewsletterForm = () => {

  const [email, setEmail] = useState("")
  const [alert, setAlert] = useState("")

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const baseUrl = `https://api.sendgrid.com/v3/marketing/contacts`
    const data = {
      list_ids: [ process.env.REACT_APP_SENDGRID_LIST_ID],
      contacts: [{ email }]
    }

    try {
      const response = await axios(baseUrl, {
        method: "put",
        data,
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`,
          "Content-Type": "application/json"
        }

      })

      if (response.status === 202) {
        setAlert("Successfully subscribed to our mailing list.")
      }
    } catch (err) {
      setAlert("There was an error. Try again.")
    }


  }

  const handleChange = (evt) => {
    setAlert("")
    setEmail(evt.target.value)
  }

  return (
    <div className="newsletter">
      <div className="email-input">
        <span>[</span><input type="text" value={email} placeholder="ENTER YOUR EMAIL HERE" onChange={handleChange} required/><span>]</span>
      </div>
      <input type="submit" value="SUBSCRIBE" onClick={handleSubmit}/>
      <p className="alert-message">{alert}</p>
    </div>
  )
}

export default NewsletterForm
