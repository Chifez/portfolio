interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

const ContactEmail = ({ name, email, message }: ContactEmailProps) => {
  return (
    <div
      style={{
        backgroundColor: '#0d0d0d',
        color: '#d1d5db',
        fontFamily: 'Arial, sans-serif',
        padding: '2rem',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#d1d5db',
        }}
      >
        New Message ✉️
      </h1>

      <p style={{ marginBottom: '0.5rem' }}>
        <strong>Name:</strong> {name}
      </p>
      <p style={{ marginBottom: '0.5rem' }}>
        <strong>Email:</strong> {email}
      </p>
      <div style={{ marginTop: '1.5rem' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Message:</p>
        <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>{message}</p>
      </div>

      <hr style={{ margin: '2rem 0', borderColor: '#333' }} />

      <footer style={{ fontSize: '12px', color: '#777' }}>
        You received this message from your portfolio contact form.
      </footer>
    </div>
  );
};
export default ContactEmail;
