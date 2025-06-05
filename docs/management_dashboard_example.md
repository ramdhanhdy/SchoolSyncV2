<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Management Home Screen</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f8f9fa;
            color: #2d3748;
            line-height: 1.5;
        }
        
        .phone-container {
            width: 375px;
            height: 812px;
            margin: 20px auto;
            background: white;
            border-radius: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
            position: relative;
        }
        
        .status-bar {
            height: 44px;
            background: #1B5E20;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            color: white;
            font-size: 14px;
            font-weight: 600;
        }
        
        .header {
            background: linear-gradient(135deg, #1B5E20, #2E7D32);
            color: white;
            padding: 20px;
            position: relative;
        }
        
        .header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
        
        .school-info h1 {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 4px;
        }
        
        .school-info p {
            font-size: 12px;
            opacity: 0.9;
        }
        
        .header-actions {
            display: flex;
            gap: 12px;
            align-items: center;
        }
        
        .notification-badge {
            position: relative;
            background: rgba(255,255,255,0.2);
            border-radius: 20px;
            padding: 8px;
            cursor: pointer;
        }
        
        .notification-badge .badge {
            position: absolute;
            top: -4px;
            right: -4px;
            background: #FFB300;
            color: #1B5E20;
            border-radius: 10px;
            padding: 2px 6px;
            font-size: 10px;
            font-weight: 700;
        }
        
        .greeting {
            margin-bottom: 12px;
        }
        
        .greeting h2 {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
        }
        
        .greeting p {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .trial-banner {
            background: rgba(255, 179, 0, 0.15);
            border: 1px solid rgba(255, 179, 0, 0.3);
            border-radius: 8px;
            padding: 12px;
            margin-top: 12px;
        }
        
        .trial-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .trial-title {
            font-size: 12px;
            font-weight: 600;
            color: #FFB300;
        }
        
        .trial-days {
            font-size: 12px;
            font-weight: 700;
            color: #FFB300;
        }
        
        .trial-progress {
            width: 100%;
            height: 6px;
            background: rgba(255, 179, 0, 0.3);
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 8px;
        }
        
        .trial-progress-fill {
            height: 100%;
            background: #FFB300;
            width: 60%;
            transition: width 0.3s ease;
        }
        
        .trial-steps {
            display: flex;
            gap: 8px;
            font-size: 10px;
            color: rgba(255, 255, 255, 0.9);
        }
        
        .content {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            height: calc(812px - 44px - 180px - 80px);
        }
        
        .snapshot-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .snapshot-card {
            background: white;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
            position: relative;
        }
        
        .snapshot-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }
        
        .snapshot-title {
            font-size: 12px;
            color: #718096;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .snapshot-value {
            font-size: 24px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 4px;
        }
        
        .snapshot-subtitle {
            font-size: 11px;
            color: #718096;
        }
        
        .snapshot-trend {
            font-size: 10px;
            font-weight: 600;
            padding: 2px 6px;
            border-radius: 12px;
        }
        
        .trend-up {
            background: #c6f6d5;
            color: #22543d;
        }
        
        .trend-down {
            background: #fed7d7;
            color: #742a2a;
        }
        
        .trend-neutral {
            background: #e2e8f0;
            color: #4a5568;
        }
        
        .priority-section {
            margin-bottom: 20px;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 12px;
        }
        
        .priority-card {
            background: white;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            border-left: 4px solid #e2e8f0;
            position: relative;
        }
        
        .priority-card.urgent {
            border-left-color: #e53e3e;
            background: #fffafa;
        }
        
        .priority-card.warning {
            border-left-color: #f6ad55;
            background: #fffef7;
        }
        
        .priority-card.success {
            border-left-color: #38a169;
            background: #f7fafc;
        }
        
        .priority-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }
        
        .priority-icon {
            font-size: 16px;
            margin-right: 8px;
        }
        
        .priority-title {
            flex: 1;
            font-size: 14px;
            font-weight: 600;
            color: #1a202c;
        }
        
        .priority-time {
            font-size: 11px;
            color: #718096;
        }
        
        .priority-description {
            font-size: 12px;
            color: #4a5568;
            margin-bottom: 8px;
            line-height: 1.4;
        }
        
        .priority-action {
            padding: 6px 12px;
            background: #1B5E20;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
        }
        
        .quick-actions {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .quick-action {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px 8px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .quick-action:hover {
            background: #f7fafc;
            border-color: #1B5E20;
            transform: translateY(-2px);
        }
        
        .quick-action-icon {
            font-size: 20px;
            margin-bottom: 8px;
            color: #1B5E20;
        }
        
        .quick-action-label {
            font-size: 11px;
            font-weight: 600;
            color: #4a5568;
        }
        
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 375px;
            background: white;
            border-top: 1px solid #e2e8f0;
            padding: 12px 20px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-radius: 0 0 25px 25px;
        }
        
        .nav-item {
            text-align: center;
            padding: 8px;
            color: #718096;
            text-decoration: none;
            font-size: 10px;
            cursor: pointer;
            transition: color 0.2s ease;
        }
        
        .nav-item.active {
            color: #1B5E20;
        }
        
        .nav-icon {
            font-size: 20px;
            margin-bottom: 4px;
            display: block;
        }
        
        .floating-action {
            position: fixed;
            bottom: 100px;
            right: 40px;
            width: 56px;
            height: 56px;
            background: #1B5E20;
            border-radius: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            box-shadow: 0 4px 12px rgba(27, 94, 32, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .floating-action:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(27, 94, 32, 0.4);
        }
        
        .weather-widget {
            background: linear-gradient(135deg, #4299e1, #3182ce);
            color: white;
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 16px;
            font-size: 12px;
        }
        
        .weather-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .prayer-times {
            background: white;
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
        }
        
        .prayer-times-title {
            font-size: 12px;
            font-weight: 600;
            color: #1a202c;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .prayer-times-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 8px;
            font-size: 11px;
        }
        
        .prayer-time {
            text-align: center;
            padding: 6px;
            background: #f7fafc;
            border-radius: 6px;
        }
        
        .prayer-time.current {
            background: #e6fffa;
            color: #1B5E20;
            font-weight: 600;
        }
        
        .prayer-name {
            font-weight: 600;
            margin-bottom: 2px;
        }
        
        .offline-banner {
            background: #fed7d7;
            color: #742a2a;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
    </style>
</head>
<body>
    <div class="phone-container">
        <!-- Status Bar -->
        <div class="status-bar">
            <span>9:41</span>
            <span>🟢 📶 🔋</span>
        </div>
        
        <!-- Header with School Info & Trial Status -->
        <div class="header">
            <div class="header-top">
                <div class="school-info">
                    <h1>🕌 Pesantren Al-Hikmah</h1>
                    <p>Bogor, Jawa Barat</p>
                </div>
                <div class="header-actions">
                    <div class="notification-badge">
                        <span class="nav-icon">🔔</span>
                        <span class="badge">5</span>
                    </div>
                    <div class="notification-badge">
                        <span class="nav-icon">👤</span>
                    </div>
                </div>
            </div>
            
            <div class="greeting">
                <h2>Assalamualaikum, Pak Ahmad</h2>
                <p>Senin, 5 Juni 2025 | 08:30 WIB</p>
            </div>
            
            <!-- Trial Status Banner -->
            <div class="trial-banner">
                <div class="trial-header">
                    <span class="trial-title">TRIAL STATUS</span>
                    <span class="trial-days">Expires in: 23d</span>
                </div>
                <div class="trial-progress">
                    <div class="trial-progress-fill"></div>
                </div>
                <div class="trial-steps">
                    <span>✓ Profile setup</span>
                    <span>✓ 5 teachers</span>
                    <span>⏳ Students</span>
                </div>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            
            <!-- Weather & Prayer Times -->
            <div class="weather-widget">
                <div class="weather-content">
                    <div>
                        <div style="font-weight: 600;">Bogor, 29°C</div>
                        <div style="font-size: 10px; opacity: 0.9;">Berawan, 65% humidity</div>
                    </div>
                    <div style="font-size: 20px;">⛅</div>
                </div>
            </div>
            
            <div class="prayer-times">
                <div class="prayer-times-title">
                    <span>🕌</span>
                    <span>Jadwal Sholat Hari Ini</span>
                </div>
                <div class="prayer-times-grid">
                    <div class="prayer-time">
                        <div class="prayer-name">Subuh</div>
                        <div>04:45</div>
                    </div>
                    <div class="prayer-time current">
                        <div class="prayer-name">Dzuhur</div>
                        <div>12:15</div>
                    </div>
                    <div class="prayer-time">
                        <div class="prayer-name">Ashar</div>
                        <div>15:30</div>
                    </div>
                </div>
            </div>
            
            <!-- Today's Snapshot -->
            <div class="section-title">Snapshot Hari Ini</div>
            <div class="snapshot-grid">
                <div class="snapshot-card">
                    <div class="snapshot-header">
                        <div class="snapshot-title">Santri</div>
                        <div class="snapshot-trend trend-up">+12</div>
                    </div>
                    <div class="snapshot-value">156</div>
                    <div class="snapshot-subtitle">12 santri baru</div>
                </div>
                
                <div class="snapshot-card">
                    <div class="snapshot-header">
                        <div class="snapshot-title">Kehadiran</div>
                        <div class="snapshot-trend trend-down">-0.5%</div>
                    </div>
                    <div class="snapshot-value">96.5%</div>
                    <div class="snapshot-subtitle">151 dari 156</div>
                </div>
                
                <div class="snapshot-card">
                    <div class="snapshot-header">
                        <div class="snapshot-title">Keuangan</div>
                        <div class="snapshot-trend trend-up">+5.2%</div>
                    </div>
                    <div class="snapshot-value">89.2%</div>
                    <div class="snapshot-subtitle">collection rate</div>
                </div>
                
                <div class="snapshot-card">
                    <div class="snapshot-header">
                        <div class="snapshot-title">Guru</div>
                        <div class="snapshot-trend trend-neutral">12/15</div>
                    </div>
                    <div class="snapshot-value">12</div>
                    <div class="snapshot-subtitle">online</div>
                </div>
            </div>
            
            <!-- Priority Actions -->
            <div class="priority-section">
                <div class="section-title">Prioritas Hari Ini</div>
                
                <div class="priority-card urgent">
                    <div class="priority-header">
                        <div style="display: flex; align-items: center;">
                            <span class="priority-icon">🔴</span>
                            <span class="priority-title">1 approval urgent</span>
                        </div>
                        <span class="priority-time">45 menit lalu</span>
                    </div>
                    <div class="priority-description">
                        Izin pulang Ahmad Rizki (3A) untuk acara keluarga - butuh persetujuan segera
                    </div>
                    <button class="priority-action">Review Sekarang</button>
                </div>
                
                <div class="priority-card warning">
                    <div class="priority-header">
                        <div style="display: flex; align-items: center;">
                            <span class="priority-icon">🟡</span>
                            <span class="priority-title">3 guru belum input absen</span>
                        </div>
                        <span class="priority-time">2 jam lalu</span>
                    </div>
                    <div class="priority-description">
                        Ust. Mahmud, Ust. Yusuf, dan Ustz. Siti belum input absensi pagi
                    </div>
                    <button class="priority-action">Kirim Reminder</button>
                </div>
                
                <div class="priority-card success">
                    <div class="priority-header">
                        <div style="display: flex; align-items: center;">
                            <span class="priority-icon">🟢</span>
                            <span class="priority-title">Target collection tercapai!</span>
                        </div>
                        <span class="priority-time">1 jam lalu</span>
                    </div>
                    <div class="priority-description">
                        Collection rate bulan ini mencapai 89.2%, melampaui target 85%
                    </div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="section-title">Aksi Cepat</div>
            <div class="quick-actions">
                <div class="quick-action">
                    <div class="quick-action-icon">👥</div>
                    <div class="quick-action-label">Tambah Guru</div>
                </div>
                <div class="quick-action">
                    <div class="quick-action-icon">📊</div>
                    <div class="quick-action-label">Reports</div>
                </div>
                <div class="quick-action">
                    <div class="quick-action-icon">⚙️</div>
                    <div class="quick-action-label">Settings</div>
                </div>
                <div class="quick-action">
                    <div class="quick-action-icon">❓</div>
                    <div class="quick-action-label">Help</div>
                </div>
            </div>
            
            <!-- Recent Activity Section -->
            <div class="section-title">Aktivitas Terbaru</div>
            <div class="priority-card" style="border-left-color: #cbd5e0;">
                <div class="priority-header">
                    <div style="display: flex; align-items: center;">
                        <span class="priority-icon">📝</span>
                        <span class="priority-title">Laporan insiden diselesaikan</span>
                    </div>
                    <span class="priority-time">3 jam lalu</span>
                </div>
                <div class="priority-description">
                    Insiden #2451 (Kesehatan: Demam Tinggi) - M. Rizki sudah ditangani tim kesehatan
                </div>
            </div>
            
            <div class="priority-card" style="border-left-color: #cbd5e0;">
                <div class="priority-header">
                    <div style="display: flex; align-items: center;">
                        <span class="priority-icon">💰</span>
                        <span class="priority-title">Pembayaran diterima</span>
                    </div>
                    <span class="priority-time">5 jam lalu</span>
                </div>
                <div class="priority-description">
                    SPP Juni dari 8 santri berhasil dikonfirmasi - total Rp 8.5M
                </div>
            </div>
            
            <div style="height: 100px;"></div> <!-- Spacer for bottom nav -->
        </div>
        
        <!-- Floating Action Button -->
        <div class="floating-action">
            <span>+</span>
        </div>
        
        <!-- Bottom Navigation -->
        <div class="bottom-nav">
            <div class="nav-item active">
                <span class="nav-icon">🏠</span>
                <span>Beranda</span>
            </div>
            <div class="nav-item">
                <span class="nav-icon">👥</span>
                <span>Santri</span>
            </div>
            <div class="nav-item">
                <span class="nav-icon">💰</span>
                <span>Keuangan</span>
            </div>
            <div class="nav-item">
                <span class="nav-icon">📊</span>
                <span>Laporan</span>
            </div>
            <div class="nav-item">
                <span class="nav-icon">🛡️</span>
                <span>Keamanan</span>
            </div>
        </div>
    </div>
</body>
</html>