import { profile } from '../data/profile'

function Footer() {
  return (
    <footer className="footer">
      <p>Copyright 2026 {profile.name}</p>
      <span>Soft-tech worlds, one project at a time.</span>
    </footer>
  )
}

export default Footer
