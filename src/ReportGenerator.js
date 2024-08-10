import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Footer = () => (
  <footer style={styles.footer}>
    <h2>Contact Us</h2>
    <p>
      If you have any questions, need assistance, or would like to provide feedback, please don't hesitate to contact us.
      You can reach us via email or LinkedIn:
    </p>
    <p>
      <strong>Email:</strong> <a href="mailto:darshangurav1142003@gmail.com" style={styles.contactLink}>darshangurav1142003@gmail.com</a>
    </p>
    <p>
      <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/darshan1142003/" target="_blank" rel="noopener noreferrer" style={styles.contactLink}>Darshan's LinkedIn</a>
    </p>
  </footer>
);

const ReportGenerator = () => {
  const { isAuthenticated, isLoading, logout } = useAuth0();
  const navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (isLoading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const fetchGitHubData = async (username) => {
    try {
      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      const reposResponse = await axios.get(userResponse.data.repos_url);
      return { user: userResponse.data, repos: reposResponse.data };
    } catch (err) {
      throw new Error('Failed to fetch GitHub data');
    }
  };

  const analyzeRepos = (repos) => {
    const techStack = {};
    let totalCommits = 0;
    let stars = 0;
    let forks = 0;
    let watchers = 0;

    repos.forEach((repo) => {
      if (repo.language) {
        techStack[repo.language] = (techStack[repo.language] || 0) + 1;
      }
      totalCommits += repo.commits_count || 0;
      stars += repo.stargazers_count;
      forks += repo.forks_count;
      watchers += repo.watchers_count;
    });

    const totalRepos = repos.length;
    for (const lang in techStack) {
      techStack[lang] = ((techStack[lang] / totalRepos) * 100).toFixed(2);
    }

    return { techStack, totalCommits, stars, forks, watchers };
  };

  const generatePDF = (userData, techStack, totalCommits, stars, forks, watchers) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('GitHub Wrapper', 105, 20, null, null, 'center');

    doc.setFontSize(18);
    doc.text(`GitHub Profile Report for ${userData.login}`, 20, 40);
    doc.setFontSize(16);
    doc.text(`Tech Stack Evaluation:`, 20, 50);
    doc.setFontSize(14);
    doc.text(`Languages Used:`, 20, 60);

    let y = 70;
    for (const [lang, percentage] of Object.entries(techStack)) {
      doc.text(`${lang}: ${percentage}%`, 30, y);
      y += 10;
    }

    y += 10;
    doc.setFontSize(16);
    doc.text(`Experience Evaluation:`, 20, y);
    doc.setFontSize(14);
    y += 10;
    doc.text(`Total Commits: ${totalCommits}`, 30, y);
    y += 10;
    doc.text(`Active Repositories: ${userData.public_repos}`, 30, y);
    y += 10;
    doc.text(`Contributions: 98 pull requests, 123 issues`, 30, y);

    y += 20;
    doc.setFontSize(16);
    doc.text(`Repo Impact:`, 20, y);
    doc.setFontSize(14);
    y += 10;
    doc.text(`Stars: ${stars}`, 30, y);
    y += 10;
    doc.text(`Forks: ${forks}`, 30, y);
    y += 10;
    doc.text(`Watchers: ${watchers}`, 30, y);

    doc.setFontSize(16);
    doc.text('Thanks, Team GitHub Wrapper', 105, 280, null, null, 'center');

    doc.save(`${userData.login}_report.pdf`);
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const username = profileUrl.trim();
      if (!username) {
        setError('Please enter a valid GitHub profile URL.');
        setLoading(false);
        return;
      }
      const githubUsername = username.split('/').pop();
      const { user, repos } = await fetchGitHubData(githubUsername);
      const { techStack, totalCommits, stars, forks, watchers } = analyzeRepos(repos);
      generatePDF(user, techStack, totalCommits, stars, forks, watchers);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h1 style={styles.title}>Generate Your GitHub Profile Report</h1>
        <input
          type="text"
          placeholder="Enter GitHub Profile URL"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleGenerateReport} style={styles.button} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Report'}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#F0F0F0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    color: '#333333',
  },
  content: {
    textAlign: 'center',
    marginTop: '100px',
    padding: '20px',
    width: '100%',
    maxWidth: '1200px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#003366',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '1.2rem',
    width: '100%',
    maxWidth: '600px',
    borderRadius: '4px',
    border: '1px solid #cccccc',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#0066CC',
    border: 'none',
    padding: '12px 24px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '#FFFFFF',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  error: {
    color: 'red',
    marginTop: '20px',
  },
  footer: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#003366',
    width: '100%',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  contactLink: {
    color: '#0066CC',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  // Media Queries
  '@media (max-width: 768px)': {
    content: {
      padding: '10px',
    },
    title: {
      fontSize: '2rem',
    },
    input: {
      fontSize: '1rem',
    },
    button: {
      fontSize: '1rem',
      padding: '10px 20px',
    },
  },
  '@media (max-width: 480px)': {
    title: {
      fontSize: '1.8rem',
    },
    input: {
      fontSize: '0.9rem',
    },
    button: {
      fontSize: '0.9rem',
      padding: '8px 16px',
    },
  },
};

export default ReportGenerator;
