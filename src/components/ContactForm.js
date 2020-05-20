import React, {useState} from 'react'
import axios from 'axios'

const ContactForm = () => {

  const [inputs, setInputs] = useState({})
  const [alert, setAlert] = useState("")

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const result = Object.keys(inputs).reduce((sum, key) => {
      return sum += `<tr><td>${key}: ${inputs[key]}</td></tr>`
    }, "")
    const from = inputs.email
    const subject = `Contact form message from ${inputs.name}`
    const html = `<table>${result}</table>`
    const url = `${process.env.REACT_APP_BACKEND}/send`
    try {
      const {data} = await axios.post(url, {from, subject, html})
      console.log(data)
      setAlert(data)
      setInputs({})
    } catch (err) {
      console.log(err)
      setAlert(err)
    }
  }

  const handleChange = (evt) => {
    setAlert("")
    setInputs({...inputs, [evt.target.name] : evt.target.value })
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit}>
      <input type="text" name="name" value={inputs.name || ""} onChange={handleChange}  placeholder="*Name" required/>
      <input type="email" name="email" value={inputs.email || ""} onChange={handleChange} placeholder="*Email" required/>
      <input type="tel" name="phone" value={inputs.phone || ""} onChange={handleChange} placeholder="*Phone" required/>
      <input type="text" name="website" value={inputs.website || ""} onChange={handleChange} placeholder="Website"/>
      <textarea className="message" type="text" name="message" value={inputs.message || ""} onChange={handleChange} placeholder="*Message" required/>
      <input type="submit" value="Send"/>
      <p className="alert">{alert}</p>
    </form>
  )
}

export default ContactForm
