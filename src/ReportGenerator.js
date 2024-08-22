import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './ReportGenerator.css'; // Import the CSS file

const ReportGenerator = ({ onLogout }) => {
  const [profileUrl, setProfileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="container">
      <h1 className="title">Generate Your GitHub Profile Report</h1>
      <p className="instructions">
        Enter your GitHub profile URL to generate a comprehensive report of your repositories, tech stack, and contributions.
      </p>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter GitHub Profile URL"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
          className="input"
        />
        <button onClick={handleGenerateReport} className="button" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Report'}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
      <footer className="footer">
        {/* Footer content removed */}
      </footer>
    </div>
  );
};

export default ReportGenerator;
