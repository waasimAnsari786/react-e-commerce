import React from "react";
import { MyTypoGraphy } from "../index";

export default function AdminStatsCard({ icon, title, value }) {
  return (
    <div className="stat">
      <div className="stat-figure text-secondary">{icon}</div>
      <MyTypoGraphy myClass="state-title">{title}</MyTypoGraphy>
      <MyTypoGraphy myClass="state-value">{value}</MyTypoGraphy>
    </div>
  );
}
