import React from 'react'

const Footer = () => {
  const Today = new Date();
  return (
  <Footer className ='Footer'>
    <p>Copyright &copy;{Today.getFullYear()}</p>
  </Footer>

  )
}

export default Footer
