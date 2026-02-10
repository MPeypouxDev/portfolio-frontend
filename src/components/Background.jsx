function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-black pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 500px at 20% 10%, rgba(99,102,241,0.28), transparent 55%),' +
            'radial-gradient(700px 500px at 80% 40%, rgba(59,130,246,0.18), transparent 60%),' +
            'radial-gradient(900px 700px at 50% 90%, rgba(168,85,247,0.18), transparent 60%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.10] mix-blend-soft-light"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'220\' height=\'220\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'220\' height=\'220\' filter=\'url(%23n)\' opacity=\'.35\'/%3E%3C/svg%3E")',
        }}
      />
    </div>
  )
}

export default Background