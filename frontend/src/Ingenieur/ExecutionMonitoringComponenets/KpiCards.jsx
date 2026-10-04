import React from "react";
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
  const phases = Array.isArray(data?.phases)
    ? data.phases
    : [];

  const totalPhases =
    kpis.total_phases ?? phases.length;

  const completedPhases =
    kpis.completed_phases ?? 0;

  const phasePercent =
    totalPhases === 0
      ? 0
      : Math.round(
          (completedPhases / totalPhases) * 100
        );

  const cardThemes = {
    progress: {
      primary: "#10b981",
      bg: "#ecfdf5",
      label: "+5% vs last week",
    },

    phases: {
      primary: "#10b981",
      bg: "#ecfdf5",
      label: "Completion rate",
    },

    quality: {
      primary: "#10b981",
      bg: "#ecfdf5",
      label: "+12% vs last week",
    },

    safety: {
      primary: "#10b981",
      bg: "#ecfdf5",
      label: "Good",
    },

    failures: {
      primary: "#ef4444",
      bg: "#fef2f2",
      label: "Needs attention",
    },

    inspections: {
      primary: "#3b82f6",
      bg: "#eff6ff",
      label: "This week",
    },
  };

  const cards = [
    {
      title: "Global Progress",
      value: Number(kpis.global_progress ?? 0),
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
      percent: phasePercent,
    },

    {
      title: "Quality Checklists",
      value: Number(kpis.quality_score ?? 0),
      unit: "%",
      icon: <FiCheckCircle />,
      theme: cardThemes.quality,
      type: "standard",
    },

    {
      title: "Safety Score",
      value: Number(kpis.safety_score ?? 0),
      subValue: " / 100",
      icon: <FiShield />,
      theme: cardThemes.safety,
      type: "standard",
    },

    {
      title: "Non-Conformities",
      value: Number(kpis.failures ?? 0),
      icon: <FiAlertTriangle />,
      theme: cardThemes.failures,
      type: "standard",
    },

    {
      title: "Open Inspections",
      value: Number(kpis.open_inspections ?? 0),
      icon: <FiClipboard />,
      theme: cardThemes.inspections,
      type: "standard",
    },
  ];

  const styles = {
    container: {
      display: "grid",

      // EXACTLY 3 COLUMNS ON LARGE SCREENS
      gridTemplateColumns:
        "repeat(3, minmax(0, 1fr))",

      gap: "16px",

      width: "100%",

      boxSizing: "border-box",

      fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },

    card: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      backgroundColor: "#ffffff",

      border:
        "1px solid #e2e8f0",

      borderRadius: "14px",

      padding: "18px 20px",

      boxShadow:
        "0 1px 3px rgba(15, 23, 42, 0.04)",

      boxSizing: "border-box",

      minHeight: "132px",

      width: "100%",

      transition:
        "box-shadow .2s ease, transform .2s ease",
    },

    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",

      minWidth: 0,

      height: "100%",

      flex: 1,
    },

    title: {
      fontSize: "13px",

      fontWeight: "600",

      color: "#475569",

      marginBottom: "8px",

      whiteSpace: "nowrap",

      overflow: "hidden",

      textOverflow: "ellipsis",
    },

    valueContainer: {
      display: "flex",

      alignItems: "baseline",

      gap: "3px",

      marginTop: "2px",
    },

    value: {
      fontSize: "28px",

      fontWeight: "700",

      color: "#0f172a",

      letterSpacing: "-0.03em",

      lineHeight: "1.1",
    },

    subValue: {
      fontSize: "14px",

      fontWeight: "500",

      color: "#64748b",
    },

    badgeText: (color) => ({
      fontSize: "11px",

      fontWeight: "600",

      color: color,

      marginTop: "7px",
    }),

    progressBarBackground: {
      width: "130px",

      maxWidth: "100%",

      height: "7px",

      backgroundColor: "#f1f5f9",

      borderRadius: "9999px",

      marginTop: "8px",

      overflow: "hidden",
    },

    iconContainer: (theme) => ({
      display: "flex",

      alignItems: "center",

      justifyContent: "center",

      width: "42px",

      height: "42px",

      backgroundColor: theme.bg,

      borderRadius: "11px",

      color: theme.primary,

      fontSize: "19px",

      flexShrink: 0,

      marginLeft: "14px",
    }),

    circleWrapper: {
      width: "58px",

      height: "58px",

      flexShrink: 0,

      transform: "rotate(-90deg)",
    },

    circleSvg: {
      width: "100%",

      height: "100%",
    },
  };

  return (
    <>
      {/* =========================
          RESPONSIVE STYLE
      ========================= */}
      <style>
        {`
          @media (max-width: 1100px) {
            .execution-kpi-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 640px) {
            .execution-kpi-grid {
              grid-template-columns: 1fr !important;
            }
          }

          .execution-kpi-card:hover {
            box-shadow:
              0 4px 12px rgba(15, 23, 42, 0.07);
            transform: translateY(-1px);
          }
        `}
      </style>

      {/* =========================
          KPI GRID
          3 TOP + 3 BOTTOM
      ========================= */}
      <div
        className="execution-kpi-grid"
        style={styles.container}
      >

        {cards.map((card, index) => {

          {/* =========================
              GLOBAL PROGRESS
          ========================= */}
          if (card.type === "circle") {
            const progress = Math.min(
              Math.max(card.value, 0),
              100
            );

            return (
              <div
                key={index}
                className="execution-kpi-card"
                style={styles.card}
              >

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    minWidth: 0,
                    width: "100%",
                  }}
                >

                  {/* Circular Progress */}
                  <div
                    style={
                      styles.circleWrapper
                    }
                  >
                    <svg
                      viewBox="0 0 36 36"
                      style={styles.circleSvg}
                    >

                      {/* Background circle */}
                      <path
                        stroke="#e2e8f0"
                        strokeWidth="3.8"
                        fill="none"
                        d="
                          M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831
                        "
                      />

                      {/* Progress circle */}
                      <path
                        stroke={
                          card.theme.primary
                        }
                        strokeWidth="3.8"
                        strokeDasharray={`${progress}, 100`}
                        strokeLinecap="round"
                        fill="none"
                        d="
                          M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831
                        "
                      />

                    </svg>
                  </div>

                  {/* Text */}
                  <div
                    style={styles.content}
                  >

                    <span
                      style={styles.title}
                    >
                      {card.title}
                    </span>

                    <span
                      style={{
                        ...styles.value,
                        marginTop: "auto",
                      }}
                    >
                      {progress}%
                    </span>

                    <span
                      style={styles.badgeText(
                        card.theme.primary
                      )}
                    >
                      {card.theme.label}
                    </span>

                  </div>

                </div>

              </div>
            );
          }

          {/* =========================
              OTHER CARDS
          ========================= */}

          return (
            <div
              key={index}
              className="execution-kpi-card"
              style={styles.card}
            >

              {/* LEFT CONTENT */}
              <div
                style={styles.content}
              >

                <span
                  style={styles.title}
                >
                  {card.title}
                </span>

                <div
                  style={
                    styles.valueContainer
                  }
                >

                  <span
                    style={styles.value}
                  >
                    {card.value}
                    {card.unit || ""}
                  </span>

                  {card.subValue && (
                    <span
                      style={styles.subValue}
                    >
                      {card.subValue}
                    </span>
                  )}

                </div>

                {/* Progress Bar */}
                {card.type === "bar" ? (
                  <div>

                    <div
                      style={
                        styles.progressBarBackground
                      }
                    >

                      <div
                        style={{
                          height: "100%",

                          width: `${Math.min(
                            Math.max(
                              card.percent,
                              0
                            ),
                            100
                          )}%`,

                          background:
                            card.theme.primary,

                          borderRadius:
                            "9999px",

                          transition:
                            "width .4s ease",
                        }}
                      />

                    </div>

                    <span
                      style={styles.badgeText(
                        card.theme.primary
                      )}
                    >
                      {card.percent}% Complete
                    </span>

                  </div>
                ) : (
                  <span
                    style={styles.badgeText(
                      card.theme.primary
                    )}
                  >
                    {card.theme.label}
                  </span>
                )}

              </div>

              {/* ICON */}
              <div
                style={styles.iconContainer(
                  card.theme
                )}
              >
                {card.icon}
              </div>

            </div>
          );
        })}

      </div>
    </>
  );
}

