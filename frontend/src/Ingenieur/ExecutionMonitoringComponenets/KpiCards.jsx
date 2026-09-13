import React from 'react';
import {
  FiTrendingUp,
  FiLayers,
  FiCheckCircle,
  FiShield,
  FiAlertTriangle,
  FiClipboard,
} from "react-icons/fi";

export default function KpiCards({ data }) {
  const kpis = data?.kpis || {};
  const phases = data?.phases || [];

  const totalPhases = kpis.total_phases || phases.length;
  const completedPhases = kpis.completed_phases || 0;

  const cardThemes = {
    progress:    { primary: '#10b981', bg: '#ecfdf5', label: '+5% vs last week' },
    phases:      { primary: '#10b981', bg: '#ecfdf5', label: 'Completion rate' },
    quality:     { primary: '#10b981', bg: '#ecfdf5', label: '+12% vs last week' },
    safety:      { primary: '#10b981', bg: '#ecfdf5', label: 'Good' },
    failures:    { primary: '#ef4444', bg: '#fef2f2', label: '2 critical' },
    inspections: { primary: '#3b82f6', bg: '#eff6ff', label: 'This week' },
  };

  const cards = [
    {
      title: "Global Progress",
      value: kpis.global_progress || 0,
      unit: "%",
      icon: <FiTrendingUp />,
      theme: cardThemes.progress,
      type: "circle",
    },
    {
      title: "Completed Phases",
      value: completedPhases,
      subValue: ` / ${totalPhases}`,
      icon: <FiLayers />,
      theme: cardThemes.phases,
      type: "bar",
      percent: totalPhases === 0 ? 0 : Math.round((completedPhases / totalPhases) * 100),
    },
    {
      title: "Quality Checklists",
      value: kpis.quality_score || 0,
      unit: "%",
      icon: <FiCheckCircle />,
      theme: cardThemes.quality,
    },
    {
      title: "Safety Score",
      value: kpis.safety_score || 0,
      subValue: " / 100",
      icon: <FiShield />,
      theme: cardThemes.safety,
    },
    {
      title: "Non-Conformities",
      value: kpis.failures || 0,
      icon: <FiAlertTriangle />,
      theme: cardThemes.failures,
    },
    {
      title: "Open Inspections",
      value: kpis.open_inspections || 0,
      icon: <FiClipboard />,
      theme: cardThemes.inspections,
    },
  ];

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    card: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: '#ffffff',
      border: '1px solid #f1f5f9',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.01)',
      boxSizing: 'border-box',
      height: '115px', 
    },
    leftContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    title: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#475569',
      whiteSpace: 'nowrap',
    },
    valueContainer: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '2px',
      marginTop: 'auto',
    },
    value: {
      fontSize: '26px',
      fontWeight: '700',
      color: '#0f172a',
      letterSpacing: '-0.025em',
      lineHeight: '1.2',
    },
    subValue: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#64748b',
    },
    badgeText: (color) => ({
      fontSize: '12px',
      fontWeight: '500',
      color: color,
      marginTop: 'auto',
    }),
    progressBarBackground: {
      width: '120px',
      height: '8px',
      backgroundColor: '#f1f5f9',
      borderRadius: '9999px',
      marginTop: '6px',
      overflow: 'hidden',
    },
    iconContainer: (theme) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '38px',
      height: '38px',
      backgroundColor: theme.bg,
      borderRadius: '50%',
      color: theme.primary,
      fontSize: '18px',
      flexShrink: 0,
    }),
  };

  return (
    <div style={styles.container}>
      {cards.map((card, i) => {
        // Render variant for the Circular Progress card
        if (card.type === "circle") {
          return (
            <div key={i} style={styles.card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', height: '100%' }}>
                <div style={{ width: '52px', height: '52px', transform: 'rotate(-90deg)', flexShrink: 0 }}>
                  <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                    <path
                      stroke="#f1f5f9"
                      strokeWidth="3.8"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      stroke={card.theme.primary}
                      strokeWidth="3.8"
                      strokeDasharray={`${card.value}, 100`}
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
                <div style={styles.leftContent}>
                  <span style={styles.title}>{card.title}</span>
                  <span style={{ ...styles.value, marginTop: 'auto' }}>{card.value}%</span>
                  <span style={styles.badgeText(card.theme.primary)}>{card.theme.label}</span>
                </div>
              </div>
            </div>
          );
        }

        // Render variant for Standard & Progress Bar cards
        return (
          <div key={i} style={styles.card}>
            <div style={styles.leftContent}>
              <span style={styles.title}>{card.title}</span>
              <div style={styles.valueContainer}>
                <span style={styles.value}>{card.value}{card.unit || ''}</span>
                {card.subValue && <span style={styles.subValue}>{card.subValue}</span>}
              </div>

              {card.type === "bar" ? (
                <div>
                  <div style={styles.progressBarBackground}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${card.percent}%`, 
                        background: card.theme.primary, 
                        borderRadius: '9999px', 
                        transition: 'width .4s ease' 
                      }} 
                    />
                  </div>
                  <span style={styles.badgeText(card.theme.primary)}>
                    {card.percent}% Complete
                  </span>
                </div>
              ) : (
                <span style={styles.badgeText(card.theme.primary)}>{card.theme.label}</span>
              )}
            </div>

            <div style={styles.iconContainer(card.theme)}>
              {card.icon}
            </div>
          </div>
        );
      })}
    </div>
  );
}