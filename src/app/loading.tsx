"use client";

export default function Loading() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <img
        src="/svg/basketball.svg"
        alt="Loading"
        className="page-loader__icon"
      />
      <div className="page-loader__text">Түр хүлээнэ үү...</div>
    </div>
  );
}
