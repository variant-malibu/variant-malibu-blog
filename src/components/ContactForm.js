import React, {useState} from 'react'

const ContactForm = () => {

  const [inputs, setInputs] = useState({})

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(inputs)
  }

  const handleChange = (evt) => {
    setInputs({...inputs, [evt.target.name] : evt.target.value })
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit}>
      <input type="text" name="name" value={inputs.name || ""} onChange={handleChange}  placeholder="*Name" required/>
      <input type="email" name="email" value={inputs.email || ""} onChange={handleChange} placeholder="*Email" required/>
      <input type="tel" name="phone" value={inputs.phone || ""} onChange={handleChange} placeholder="*Phone" required/>
      <input type="text" name="website" value={inputs.website || ""} onChange={handleChange} placeholder="*Website"/>
      <textarea className="message" type="text" name="message" value={inputs.message || ""} onChange={handleChange} placeholder="*Message" required/>
      <input type="submit" value="Send"/>
    </form>
  )
}

export default ContactForm
