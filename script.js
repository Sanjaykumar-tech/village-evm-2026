class VillageEVM {
    constructor() {
        console.log("🚀 Initializing VillageEVM...");
        
        this.villageName = "குணமங்கலம்";
        this.boothNumber = "TN-15-157-158";
        this.surveyorName = "குணமங்கலம் TVK";
        
        // Total voters
        this.totalVoters = 1462;
        
        this.currentUser = null;
        this.isAdmin = false;
        this.otpTimer = null;
        this.otpExpiry = null;
        this.generatedOtp = null;
        
        // Admin email
        this.adminEmail = "sanjaykumar.techdev@gmail.com";
        
        // Load saved settings
        this.voteDelay = parseInt(localStorage.getItem('evm_vote_delay')) || 2000;
        this.adminEmail = localStorage.getItem('evm_admin_email') || this.adminEmail;
        
        // Chart instance
        this.chart = null;
        
        // Suggestions array
        this.suggestions = this.loadSuggestions();
        
        // Parties array
        this.parties = [
            { id: 1, name: "திராவிட முன்னேற்றக் கழகம்", short: "DMK", symbol: '<img src="images/dmk.png" alt="DMK" class="party-symbol-img">', alliance: "SECULAR", color: "#e31b23", votes: 0 },
            { id: 2, name: "அனைத்திந்திய அண்ணா திராவிட முன்னேற்றக் கழகம்", short: "AIADMK", symbol: '<img src="images/aiadmk.png" alt="AIADMK" class="party-symbol-img">', alliance: "NDA", color: "#00843D", votes: 0 },
            { id: 3, name: "தமிழக வெற்றி கழகம்", short: "TVK", symbol: '<img src="images/tvk.jpeg" alt="TVK" class="party-symbol-img">', alliance: "Others", color: "#e31b23", votes: 0 },
            { id: 4, name: "பாரதிய ஜனதா கட்சி", short: "BJP", symbol: '<img src="images/bjp.png" alt="BJP" class="party-symbol-img">', alliance: "NDA", color: "#FF9933", votes: 0 },
            { id: 5, name: "இந்திய தேசிய காங்கிரஸ்", short: "INC", symbol: '<img src="images/inc.png" alt="INC" class="party-symbol-img">', alliance: "SECULAR", color: "#00BFFF", votes: 0 },
            { id: 6, name: "நாம் தமிழர் கட்சி", short: "NTK", symbol: '<img src="images/ntk.png" alt="NTK" class="party-symbol-img">', alliance: "Others", color: "#FFD700", votes: 0 },
            { id: 7, name: "பாட்டாளி மக்கள் கட்சி", short: "PMK", symbol: '<img src="images/pmk.png" alt="PMK" class="party-symbol-img">', alliance: "NDA", color: "#FFA500", votes: 0 },
            { id: 8, name: "விடுதலை சிறுத்தைகள் கட்சி", short: "VCK", symbol: '<img src="images/vck.jpeg" alt="VCK" class="party-symbol-img">', alliance: "SECULAR", color: "#800080", votes: 0 },
            { id: 9, name: "தேசிய முற்போக்கு திராவிட கழகம்", short: "DMDK", symbol: '<img src="images/dmdk.jpeg" alt="DMDK" class="party-symbol-img">', alliance: "Others", color: "#FFD700", votes: 0 },
            { id: 10, name: "மறுமலர்ச்சி திராவிட முன்னேற்றக் கழகம்", short: "MDMK", symbol: '<img src="images/mdmk.png" alt="MDMK" class="party-symbol-img">', alliance: "SECULAR", color: "#FF0000", votes: 0 },
            { id: 11, name: "மக்கள் நீதி மய்யம்", short: "MNM", symbol: '<img src="images/mnm.png" alt="MNM" class="party-symbol-img">', alliance: "SECULAR", color: "#FF69B4", votes: 0 },
            { id: 12, name: "இந்திய கம்யூனிஸ்ட் கட்சி (மார்க்சிஸ்ட்)", short: "CPI(M)", symbol: '<img src="images/cpim.png" alt="CPI(M)" class="party-symbol-img">', alliance: "Left", color: "#FF0000", votes: 0 },
            { id: 13, name: "இந்திய கம்யூனிஸ்ட் கட்சி", short: "CPI", symbol: '<img src="images/cpi.png" alt="CPI" class="party-symbol-img">', alliance: "Left", color: "#FF0000", votes: 0 },
            { id: 14, name: "இந்திய யூனியன் முஸ்லிம் லீக்", short: "IUML", symbol: '<img src="images/iuml.png" alt="IUML" class="party-symbol-img">', alliance: "SECULAR", color: "#008000", votes: 0 },
            { id: 15, name: "அம்மா மக்கள் முன்னேற்ற கழகம்", short: "AMMK", symbol: '<img src="images/ammk.png" alt="AMMK" class="party-symbol-img">', alliance: "NDA", color: "#00843D", votes: 0 },
            { id: 16, name: "தமிழ் மாநில காங்கிரஸ்", short: "TMC(M)", symbol: '<img src="images/tmc.png" alt="TMC" class="party-symbol-img">', alliance: "SECULAR", color: "#00BFFF", votes: 0 },
            { id: 17, name: "புதிய தமிழகம் கட்சி", short: "PT", symbol: '<img src="images/pt.png" alt="PT" class="party-symbol-img">', alliance: "NDA", color: "#FFA500", votes: 0 },
            { id: 19, name: "ஆம் ஆத்மி கட்சி", short: "AAP", symbol: '<img src="images/aap.png" alt="AAP" class="party-symbol-img">', alliance: "Others", color: "#0000FF", votes: 0 },
            { id: 20, name: "பகுஜன் சமாஜ் கட்சி", short: "BSP", symbol: '<img src="images/bsp.png" alt="BSP" class="party-symbol-img">', alliance: "Others", color: "#0000FF", votes: 0 },
            { id: 21, name: "நோட்டா", short: "NOTA", symbol: '<img src="images/nota.png" alt="NOTA" class="party-symbol-img">', alliance: "Others", color: "#000000", votes: 0 }
        ];
        
        this.voters = [];
        this.totalVotes = 0;
        this.selectedParty = null;
        this.lastVoteTime = 0;
        this.remainingTime = 0;
        this.timerInterval = null;
        
        // Load dark mode preference
        this.loadDarkMode();
        
        // Initialize
        this.checkSession();
        this.loadVotes();
        this.initLoginSystem();
        
        console.log("✅ VillageEVM initialized with", this.parties.length, "parties");
        console.log("👥 Total voters in village:", this.totalVoters);
    }

    // ========== DARK MODE ==========
    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('evm_dark_mode', isDark ? 'dark' : 'light');
    }

    loadDarkMode() {
        const saved = localStorage.getItem('evm_dark_mode');
        if (saved === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    // ========== VOTE MANAGEMENT ==========
    loadVotes() {
        try {
            const key = `villageVotes_${this.villageName}`;
            const saved = localStorage.getItem(key);
            
            if (saved) {
                const votes = JSON.parse(saved);
                this.parties = this.parties.map(party => ({
                    ...party,
                    votes: votes[party.id] || 0
                }));
                this.totalVotes = this.parties.reduce((sum, p) => sum + p.votes, 0);
                this.updateVoteDisplay();
            }
        } catch (error) {
            console.error("❌ Error in loadVotes:", error);
        }
    }
    
    saveVotes() {
        try {
            const key = `villageVotes_${this.villageName}`;
            const votes = {};
            this.parties.forEach(party => {
                votes[party.id] = party.votes;
            });
            localStorage.setItem(key, JSON.stringify(votes));
            this.updateVoteDisplay();
        } catch (error) {
            console.error("❌ Error in saveVotes:", error);
        }
    }
    
    updateVoteDisplay() {
        document.getElementById('totalVotes').textContent = this.totalVotes;
        document.getElementById('totalVotesFooter').textContent = this.totalVotes;
        document.getElementById('votersCount').textContent = this.totalVoters;
        this.renderParties();
        this.renderResults();
        if (document.getElementById('chartsTab').classList.contains('active') === false) {
            this.updateChart();
        }
    }
    
    confirmVote() {
        if (this.selectedParty) {
            const now = Date.now();
            if (now - this.lastVoteTime < this.voteDelay) {
                this.remainingTime = Math.ceil((this.voteDelay - (now - this.lastVoteTime)) / 1000);
                this.showToast(`⏳ ${this.remainingTime} வினாடிகள் காத்திருக்கவும்`, 'warning');
                document.getElementById('confirmModal').style.display = 'none';
                return;
            }
            
            const partyShort = this.selectedParty.short;
            const partyId = this.selectedParty.id;
            
            this.selectedParty.votes += 1;
            this.totalVotes++;
            this.lastVoteTime = now;
            
            this.saveVotes();
            this.renderParties();
            this.renderResults();
            this.updateChart();
            
            this.showToast(`✅ ${partyShort} - வாக்கு பதிவானது!`, 'success');
            
            // Winner animation
            const sorted = [...this.parties].sort((a, b) => b.votes - a.votes);
            if (sorted[0].id === partyId && this.totalVotes > 0) {
                this.playWinnerAnimation(partyShort);
            }
            
            document.getElementById('confirmModal').style.display = 'none';
            this.selectedParty = null;
            this.remainingTime = 2;
        }
    }
    
    resetVotes() {
        if (!this.isAdmin) {
            this.showToast('❌ இது நிர்வாகிகளுக்கு மட்டும்', 'error');
            return;
        }
        
        if (confirm('⚠️ நிச்சயமாக அனைத்து வாக்குகளையும் மீட்டமைக்க விரும்புகிறீர்களா?')) {
            this.parties.forEach(party => party.votes = 0);
            this.totalVotes = 0;
            this.lastVoteTime = 0;
            this.remainingTime = 0;
            this.saveVotes();
            this.renderParties();
            this.renderResults();
            this.updateChart();
            this.showToast('🔄 அனைத்து வாக்குகளும் மீட்டமைக்கப்பட்டன', 'success');
            document.getElementById('timerDisplay').classList.add('hidden');
        }
    }

    // ========== WHATSAPP SHARE ==========
    shareResultsWhatsApp() {
        const sortedParties = [...this.parties].sort((a, b) => b.votes - a.votes);
        const topParties = sortedParties.slice(0, 5);
        
        let message = `*🏡 கிராம வாக்குப்பதிவு 2026 - முடிவுகள்*\n`;
        message += `📍 *கிராமம்:* ${this.villageName}\n`;
        message += `🗳️ *மொத்த வாக்குகள்:* ${this.totalVotes}\n`;
        message += `👥 *மொத்த வாக்காளர்கள்:* ${this.totalVoters}\n`;
        message += `📊 *வாக்கு சதவீதம்:* ${this.totalVoters ? ((this.totalVotes / this.totalVoters) * 100).toFixed(1) : 0}%\n\n`;
        message += `*🏆 முன்னணி கட்சிகள்:*\n`;
        
        topParties.forEach((party, index) => {
            const percentage = this.totalVotes > 0 ? ((party.votes / this.totalVotes) * 100).toFixed(1) : 0;
            message += `${index+1}. ${party.short} - ${party.votes} வாக்குகள் (${percentage}%)\n`;
        });
        
        message += `\n🔗 ${window.location.href}`;
        
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    }

    shareSuggestionsWhatsApp() {
        if (this.suggestions.length === 0) {
            this.showToast('📭 கோரிக்கைகள் இல்லை', 'warning');
            return;
        }
        
        let message = `*💡 கிராம வாக்குப்பதிவு 2026 - கோரிக்கைகள்*\n`;
        message += `📍 *கிராமம்:* ${this.villageName}\n`;
        message += `📋 *மொத்த கோரிக்கைகள்:* ${this.suggestions.length}\n\n`;
        
        this.suggestions.slice(0, 5).forEach((s, i) => {
            message += `${i+1}. *${s.title}*\n`;
            message += `   ${s.description.substring(0, 50)}...\n`;
            message += `   ✍️ ${s.author} | ${s.date}\n\n`;
        });
        
        message += `🔗 ${window.location.href}`;
        
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    }

    // ========== PRINT FUNCTIONS ==========
    printResults() {
        const printWindow = window.open('', '_blank');
        
        const sortedParties = [...this.parties].sort((a, b) => b.votes - a.votes);
        
        let tableRows = '';
        sortedParties.forEach((party, index) => {
            const percentage = this.totalVotes > 0 ? ((party.votes / this.totalVotes) * 100).toFixed(1) : 0;
            tableRows += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${party.short}</td>
                    <td>${party.name}</td>
                    <td>${party.votes}</td>
                    <td>${percentage}%</td>
                </tr>
            `;
        });
        
        printWindow.document.write(`
            <html>
            <head>
                <title>Village EVM Results - ${this.villageName}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 30px; }
                    h1 { color: #000; border-bottom: 2px solid #000; padding-bottom: 10px; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th { background: #000; color: white; padding: 12px; text-align: left; }
                    td { padding: 10px; border-bottom: 1px solid #ddd; }
                    .total { margin-top: 20px; font-weight: bold; }
                    .footer { margin-top: 30px; font-size: 12px; color: #666; text-align: center; }
                </style>
            </head>
            <body>
                <h1>🏡 கிராம வாக்குப்பதிவு 2026 - முடிவுகள்</h1>
                <p><strong>கிராமம்:</strong> ${this.villageName}</p>
                <p><strong>வாக்குச்சாவடி:</strong> ${this.boothNumber}</p>
                <p><strong>தேதி:</strong> ${new Date().toLocaleDateString('ta-IN')}</p>
                
                <table>
                    <tr>
                        <th>தரம்</th>
                        <th>கட்சி</th>
                        <th>முழு பெயர்</th>
                        <th>வாக்குகள்</th>
                        <th>சதவீதம்</th>
                    </tr>
                    ${tableRows}
                </table>
                
                <div class="total">
                    <p><strong>மொத்த வாக்குகள்:</strong> ${this.totalVotes}</p>
                    <p><strong>மொத்த வாக்காளர்கள்:</strong> ${this.totalVoters}</p>
                    <p><strong>வாக்கு சதவீதம்:</strong> ${this.totalVoters ? ((this.totalVotes / this.totalVoters) * 100).toFixed(1) : 0}%</p>
                </div>
                
                <div class="footer">
                    <p>உருவாக்கப்பட்டது: ${new Date().toLocaleString('ta-IN')}</p>
                </div>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }

    printVotersList() {
        if (!this.isAdmin) {
            this.showToast('❌ நிர்வாகிகள் மட்டும்', 'error');
            return;
        }
        
        const printWindow = window.open('', '_blank');
        
        let votersHtml = '';
        for (let i = 1; i <= this.totalVoters; i++) {
            votersHtml += `
                <tr>
                    <td>${i}</td>
                    <td>வாக்காளர்_${i}</td>
                    <td>${Math.floor(Math.random() * 100) + 1}</td>
                    <td>${i <= this.totalVotes ? '✅ வாக்களித்தார்' : '⏳ வாக்களிக்கவில்லை'}</td>
                </tr>
            `;
        }
        
        printWindow.document.write(`
            <html>
            <head>
                <title>Voter List - ${this.villageName}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 30px; }
                    h1 { color: #000; border-bottom: 2px solid #000; padding-bottom: 10px; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th { background: #000; color: white; padding: 12px; text-align: left; }
                    td { padding: 10px; border-bottom: 1px solid #ddd; }
                    .stats { margin: 20px 0; padding: 15px; background: #f5f5f5; }
                </style>
            </head>
            <body>
                <h1>👥 ${this.villageName} - வாக்காளர்கள் பட்டியல்</h1>
                
                <div class="stats">
                    <p><strong>மொத்த வாக்காளர்கள்:</strong> ${this.totalVoters}</p>
                    <p><strong>பதிவான வாக்குகள்:</strong> ${this.totalVotes}</p>
                    <p><strong>மீதமுள்ள வாக்காளர்கள்:</strong> ${this.totalVoters - this.totalVotes}</p>
                </div>
                
                <table>
                    <tr>
                        <th>வ.எண்</th>
                        <th>வாக்காளர் பெயர்</th>
                        <th>வீட்டு எண்</th>
                        <th>நிலை</th>
                    </tr>
                    ${votersHtml}
                </table>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }

    // ========== WINNER ANIMATION ==========
    playWinnerAnimation(winnerParty) {
        const canvas = document.getElementById('winnerCanvas');
        canvas.style.display = 'block';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                size: Math.random() * 10 + 5,
                color: `hsl(${Math.random() * 360}, 70%, 50%)`
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`🏆 ${winnerParty} 🏆`, canvas.width/2, canvas.height/2);
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        setTimeout(() => {
            canvas.style.display = 'none';
        }, 5000);
    }

    // ========== SUGGESTIONS SYSTEM ==========
    loadSuggestions() {
        const saved = localStorage.getItem('village_suggestions');
        return saved ? JSON.parse(saved) : [];
    }
    
    saveSuggestions() {
        localStorage.setItem('village_suggestions', JSON.stringify(this.suggestions));
    }
    
    addSuggestion() {
        const title = document.getElementById('suggestionTitle').value.trim();
        const desc = document.getElementById('suggestionDesc').value.trim();
        const name = document.getElementById('suggesterName').value.trim();
        
        if (!title || !desc) {
            this.showToast('❌ தலைப்பு மற்றும் விவரம் அவசியம்', 'warning');
            return;
        }
        
        const suggestion = {
            id: Date.now(),
            title: title,
            description: desc,
            author: name || 'அநாமதேயர்',
            email: this.currentUser ? this.currentUser.email : 'anonymous',
            date: new Date().toLocaleString('ta-IN'),
            timestamp: Date.now(),
            status: 'pending'
        };
        
        this.suggestions.unshift(suggestion);
        this.saveSuggestions();
        this.renderSuggestions();
        
        document.getElementById('suggestionTitle').value = '';
        document.getElementById('suggestionDesc').value = '';
        document.getElementById('suggesterName').value = '';
        
        this.showToast('✅ கோரிக்கை சமர்ப்பிக்கப்பட்டது!', 'success');
    }
    
    renderSuggestions() {
        const container = document.getElementById('suggestionsContainer');
        if (!container) return;
        
        if (this.suggestions.length === 0) {
            container.innerHTML = '<p class="text-center" style="padding: 30px; color: var(--dark-gray);">📭 இதுவரை கோரிக்கைகள் இல்லை</p>';
            return;
        }
        
        container.innerHTML = this.suggestions.slice(0, 20).map(s => `
            <div class="suggestion-card">
                <div class="suggestion-header">
                    <span class="suggestion-title">${this.escapeHtml(s.title)}</span>
                    <span class="suggestion-date">${s.date}</span>
                </div>
                <div class="suggestion-desc">${this.escapeHtml(s.description)}</div>
                <div class="suggestion-footer">
                    <span class="suggestion-author">✍️ ${this.escapeHtml(s.author)}</span>
                    <span class="suggestion-status ${s.status}">${s.status === 'pending' ? '⏳ நிலுவையில்' : '✅ பரிசீலனையில்'}</span>
                </div>
            </div>
        `).join('');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ========== LOGOUT ==========
    logout() {
        console.log("🚪 Logging out...");
        localStorage.removeItem('evm_session');
        this.currentUser = null;
        this.isAdmin = false;
        
        if (this.otpTimer) clearInterval(this.otpTimer);
        this.generatedOtp = null;
        this.otpExpiry = null;
        
        document.getElementById('emailInput').value = '';
        document.getElementById('otpInput').value = '';
        document.getElementById('otpGroup').classList.add('hidden');
        document.getElementById('sendOtpBtn').classList.remove('hidden');
        document.getElementById('loginWithOtpBtn').classList.add('hidden');
        document.getElementById('otpTimer').textContent = 'OTP காலாவதியாக 5:00';
        
        document.getElementById('mainApp').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
        
        this.showToast('👋 வெளியேறியது! மீண்டும் வருக', 'info');
    }

    // ========== TAB SWITCHING ==========
    switchTab(tabName) {
        document.getElementById('voteTab').classList.add('hidden');
        document.getElementById('suggestionsTab').classList.add('hidden');
        document.getElementById('resultsTab').classList.add('hidden');
        document.getElementById('votersTab').classList.add('hidden');
        document.getElementById('chartsTab').classList.add('hidden');
        
        document.getElementById('tabVoteBtn').classList.remove('active');
        document.getElementById('tabSuggestBtn').classList.remove('active');
        document.getElementById('tabResultsBtn').classList.remove('active');
        document.getElementById('tabVotersBtn').classList.remove('active');
        document.getElementById('tabChartsBtn').classList.remove('active');
        
        document.getElementById(tabName + 'Tab').classList.remove('hidden');
        document.getElementById('tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1) + 'Btn').classList.add('active');
        
        if (tabName === 'suggestions') {
            this.renderSuggestions();
        } else if (tabName === 'voters') {
            this.renderVotersList();
        } else if (tabName === 'charts') {
            this.updateChart();
        }
    }

    // ========== VOTERS LIST ==========
    renderVotersList() {
        const tbody = document.getElementById('votersBody');
        if (!tbody) return;
        
        const searchTerm = document.getElementById('voterSearch')?.value.toLowerCase() || '';
        
        let html = '';
        for (let i = 1; i <= this.totalVoters; i++) {
            const voterName = `வாக்காளர்_${i}`;
            const houseNo = Math.floor(Math.random() * 100) + 1;
            const hasVoted = i <= this.totalVotes;
            
            if (searchTerm && !voterName.toLowerCase().includes(searchTerm)) {
                continue;
            }
            
            html += `
                <tr>
                    <td>${i}</td>
                    <td>${voterName}</td>
                    <td>${houseNo}</td>
                    <td>
                        <span class="voter-status ${hasVoted ? 'voted' : 'not-voted'}">
                            ${hasVoted ? '✅ வாக்களித்தார்' : '⏳ வாக்களிக்கவில்லை'}
                        </span>
                    </td>
                </tr>
            `;
        }
        
        tbody.innerHTML = html || '<tr><td colspan="4" class="text-center">😕 வாக்காளர்கள் இல்லை</td></tr>';
        
        document.getElementById('voterSearch').addEventListener('input', () => this.renderVotersList());
    }

    // ========== CHARTS ==========
    updateChart() {
        const canvas = document.getElementById('voteChart');
        if (!canvas) return;
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        const ctx = canvas.getContext('2d');
        
        const sortedParties = [...this.parties].sort((a, b) => b.votes - a.votes);
        const topParties = sortedParties.filter(p => p.votes > 0).slice(0, 8);
        
        if (topParties.length === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#666';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('📊 இதுவரை வாக்குகள் இல்லை', canvas.width/2, canvas.height/2);
            document.getElementById('chartLegend').innerHTML = '';
            return;
        }
        
        this.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: topParties.map(p => p.short),
                datasets: [{
                    data: topParties.map(p => p.votes),
                    backgroundColor: topParties.map(p => p.color),
                    borderColor: 'white',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value} votes (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
        
        const legend = document.getElementById('chartLegend');
        legend.innerHTML = topParties.map(p => {
            const percentage = this.totalVotes > 0 ? ((p.votes / this.totalVotes) * 100).toFixed(1) : 0;
            return `
                <div class="legend-item">
                    <div class="legend-color" style="background: ${p.color};"></div>
                    <span><strong>${p.short}</strong> - ${p.votes} (${percentage}%)</span>
                </div>
            `;
        }).join('');
    }

    // ========== LOGIN SYSTEM ==========
    initLoginSystem() {
        const sendOtpBtn = document.getElementById('sendOtpBtn');
        const loginWithOtpBtn = document.getElementById('loginWithOtpBtn');
        const emailInput = document.getElementById('emailInput');
        const otpGroup = document.getElementById('otpGroup');
        const otpInput = document.getElementById('otpInput');

        sendOtpBtn.addEventListener('click', async () => {
            const email = emailInput.value.trim();

            if (!email || !email.includes('@')) {
                this.showToast('❌ சரியான மின்னஞ்சலை உள்ளிடவும்', 'warning');
                return;
            }

            sendOtpBtn.innerHTML = '⏳ அனுப்புகிறது...';
            sendOtpBtn.disabled = true;

            this.generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            this.otpExpiry = Date.now() + 5 * 60 * 1000;

            try {
                const serviceId = "service_mk8juw2";
                const templateId = "template_8tdjqzh";

                const templateParams = {
                    to_email: email,
                    email: email,
                    to: email,
                    to_name: email.split('@')[0],
                    otp_code: this.generatedOtp
                };
                
                const response = await emailjs.send(
                    serviceId,
                    templateId,
                    templateParams
                );

                if (response && response.status === 200) {
                    otpGroup.classList.remove('hidden');
                    sendOtpBtn.classList.add('hidden');
                    loginWithOtpBtn.classList.remove('hidden');
                    this.startOtpTimer();
                    this.showToast('✅ OTP உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டது!', 'success');
                } else {
                    throw new Error(`Failed with status: ${response?.status}`);
                }

            } catch (error) {
                console.error('❌ EmailJS Error:', error);
                this.showToast(`📨 OTP: ${this.generatedOtp} (Check Console F12)`, 'info');
                otpGroup.classList.remove('hidden');
                sendOtpBtn.classList.add('hidden');
                loginWithOtpBtn.classList.remove('hidden');
                this.startOtpTimer();

            } finally {
                sendOtpBtn.innerHTML = '📨 OTP அனுப்பு';
                sendOtpBtn.disabled = false;
            }
        });

        loginWithOtpBtn.addEventListener('click', () => {
            const enteredOtp = otpInput.value.trim();

            if (!enteredOtp) {
                this.showToast('❌ OTP உள்ளிடவும்', 'warning');
                return;
            }

            if (Date.now() > this.otpExpiry) {
                this.showToast('⏰ OTP காலாவதியாகிவிட்டது', 'error');
                this.resetLogin();
                return;
            }

            if (enteredOtp === this.generatedOtp) {
                const email = emailInput.value.trim();
                this.currentUser = { email: email, loginTime: Date.now() };
                
                this.isAdmin = (email.toLowerCase() === this.adminEmail.toLowerCase());
                
                localStorage.setItem('evm_session', JSON.stringify({
                    email: email,
                    isAdmin: this.isAdmin,
                    expiry: Date.now() + 24 * 60 * 60 * 1000
                }));

                document.getElementById('loginScreen').classList.add('hidden');
                document.getElementById('mainApp').classList.remove('hidden');
                document.getElementById('userEmailDisplay').classList.remove('hidden');
                document.getElementById('userEmail').textContent = email;
                
                const roleBadge = document.getElementById('userRoleBadge');
                roleBadge.textContent = this.isAdmin ? '🔰 நிர்வாகி' : '👤 வாக்காளர்';
                roleBadge.className = 'role-badge ' + (this.isAdmin ? 'admin' : 'user');
                
                document.querySelectorAll('.admin-only').forEach(el => {
                    if (this.isAdmin) {
                        el.classList.remove('hidden');
                    } else {
                        el.classList.add('hidden');
                    }
                });
                
                document.getElementById('tabResultsBtn').classList.toggle('hidden', !this.isAdmin);
                document.getElementById('tabVotersBtn').classList.toggle('hidden', !this.isAdmin);
                document.getElementById('tabChartsBtn').classList.toggle('hidden', !this.isAdmin);
                document.getElementById('tabAdminBtn').classList.toggle('hidden', !this.isAdmin);

                this.showToast(`✅ வரவேற்கிறோம்${this.isAdmin ? ' நிர்வாகி' : ''}!`, 'success');
                this.init();
            } else {
                this.showToast('❌ தவறான OTP', 'error');
            }
        });
    }

    startOtpTimer() {
        const timerElement = document.getElementById('otpTimer');
        if (this.otpTimer) clearInterval(this.otpTimer);
        
        this.otpTimer = setInterval(() => {
            const remaining = Math.max(0, this.otpExpiry - Date.now());
            if (remaining <= 0) {
                clearInterval(this.otpTimer);
                timerElement.textContent = '⏰ OTP காலாவதியானது';
                this.resetLogin();
                return;
            }
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            timerElement.textContent = `OTP காலாவதியாக ${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    resetLogin() {
        document.getElementById('otpGroup').classList.add('hidden');
        document.getElementById('sendOtpBtn').classList.remove('hidden');
        document.getElementById('loginWithOtpBtn').classList.add('hidden');
        document.getElementById('otpInput').value = '';
        if (this.otpTimer) clearInterval(this.otpTimer);
    }

    checkSession() {
        const session = localStorage.getItem('evm_session');
        if (session) {
            const data = JSON.parse(session);
            if (data.expiry > Date.now()) {
                this.currentUser = { email: data.email };
                this.isAdmin = data.isAdmin || false;
                
                document.getElementById('loginScreen').classList.add('hidden');
                document.getElementById('mainApp').classList.remove('hidden');
                document.getElementById('userEmailDisplay').classList.remove('hidden');
                document.getElementById('userEmail').textContent = data.email;
                
                const roleBadge = document.getElementById('userRoleBadge');
                roleBadge.textContent = this.isAdmin ? '🔰 நிர்வாகி' : '👤 வாக்காளர்';
                roleBadge.className = 'role-badge ' + (this.isAdmin ? 'admin' : 'user');
                
                document.querySelectorAll('.admin-only').forEach(el => {
                    if (this.isAdmin) {
                        el.classList.remove('hidden');
                    } else {
                        el.classList.add('hidden');
                    }
                });
                
                document.getElementById('tabResultsBtn').classList.toggle('hidden', !this.isAdmin);
                document.getElementById('tabVotersBtn').classList.toggle('hidden', !this.isAdmin);
                document.getElementById('tabChartsBtn').classList.toggle('hidden', !this.isAdmin);
                document.getElementById('tabAdminBtn').classList.toggle('hidden', !this.isAdmin);
                
                this.init();
            } else {
                localStorage.removeItem('evm_session');
            }
        }
    }

    // ========== MAIN APP FUNCTIONS ==========
    init() {
        console.log("📱 Initializing main app...");
        
        document.getElementById('villageName').textContent = this.villageName;
        document.getElementById('boothNumber').innerHTML = `வாக்குச்சாவடி: ${this.boothNumber}`;
        document.getElementById('surveyorName').innerHTML = `கணக்கெடுப்பாளர்: ${this.surveyorName}`;
        
        this.renderParties();
        this.renderResults();
        this.renderSuggestions();
        this.startTimer();
        this.attachEvents();
    }

    renderParties() {
        const grid = document.getElementById('partyGrid');
        if (!grid) return;
        
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const allianceFilter = document.getElementById('allianceFilter')?.value || 'all';
        
        let filteredParties = this.parties;
        
        if (searchTerm) {
            filteredParties = filteredParties.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.short.toLowerCase().includes(searchTerm)
            );
        }
        
        if (allianceFilter !== 'all') {
            filteredParties = filteredParties.filter(p => p.alliance === allianceFilter);
        }
        
        if (filteredParties.length === 0) {
            grid.innerHTML = '<p class="text-center">😕 கட்சிகள் இல்லை</p>';
            return;
        }
        
        grid.innerHTML = filteredParties.map(party => `
            <button class="party-btn" onclick="villageEVM.selectParty(${party.id})"
                    ${this.remainingTime > 0 ? 'disabled' : ''}>
                <div class="party-symbol">${party.symbol}</div>
                <div class="party-short">${party.short}</div>
                <div class="party-name-tamil">${party.name.substring(0, 20)}...</div>
                <span class="party-alliance">${party.alliance}</span>
                <div class="party-votes">${party.votes} வாக்குகள்</div>
            </button>
        `).join('');
        
        document.getElementById('totalVotes').textContent = this.totalVotes;
        document.getElementById('totalVotesFooter').textContent = this.totalVotes;
    }

    renderResults() {
        const tbody = document.getElementById('resultsBody');
        if (!tbody) return;
        
        const sortedParties = [...this.parties].sort((a, b) => b.votes - a.votes);
        
        tbody.innerHTML = sortedParties.map((party, index) => {
            const percentage = this.totalVotes > 0 ? ((party.votes / this.totalVotes) * 100).toFixed(1) : 0;
            
            return `
                <tr>
                    <td><strong>${index + 1}</strong></td>
                    <td>${party.symbol}</td>
                    <td><strong>${party.short}</strong></td>
                    <td>${party.name.substring(0, 20)}...</td>
                    <td><strong>${party.votes}</strong></td>
                    <td>
                        <strong>${percentage}%</strong>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%;"></div>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    selectParty(partyId) {
        if (this.remainingTime > 0) {
            this.showToast(`⏳ ${this.remainingTime} வினாடிகள் காத்திருக்கவும்`, 'warning');
            return;
        }
        
        this.selectedParty = this.parties.find(p => p.id === partyId);
        if (!this.selectedParty) return;
        
        document.getElementById('modalPartySymbol').innerHTML = this.selectedParty.symbol;
        document.getElementById('modalPartyName').innerHTML = this.selectedParty.short;
        document.getElementById('modalPartyTamil').innerHTML = this.selectedParty.name;
        document.getElementById('confirmModal').style.display = 'flex';
    }

    cancelVote() {
        document.getElementById('confirmModal').style.display = 'none';
        this.selectedParty = null;
    }

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        
        this.timerInterval = setInterval(() => {
            if (this.lastVoteTime > 0) {
                const elapsed = Date.now() - this.lastVoteTime;
                this.remainingTime = Math.max(0, 2 - Math.floor(elapsed / 1000));
                
                const timerDisplay = document.getElementById('timerDisplay');
                const timerValue = document.getElementById('timerValue');
                
                if (timerDisplay && timerValue) {
                    if (this.remainingTime > 0) {
                        timerDisplay.classList.remove('hidden');
                        timerDisplay.classList.add('flex-visible');
                        timerValue.textContent = this.remainingTime;
                    } else {
                        timerDisplay.classList.add('hidden');
                    }
                }
                
                this.renderParties();
            }
        }, 100);
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2000);
    }

    attachEvents() {
        const searchInput = document.getElementById('searchInput');
        const allianceFilter = document.getElementById('allianceFilter');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.renderParties());
        }
        
        if (allianceFilter) {
            allianceFilter.addEventListener('change', () => this.renderParties());
        }
        
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('confirmModal')) {
                this.cancelVote();
            }
        });
        
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.cancelVote();
            }
        });
    }

    // ========== ADMIN PANEL FUNCTIONS ==========
    showAdminDashboard() {
        if (!this.isAdmin) {
            this.showToast('❌ நிர்வாகிகள் மட்டும்', 'error');
            return;
        }
        
        const adminDashboard = `
            <div class="admin-dashboard">
                <h2>⚙️ நிர்வாக கட்டுப்பாட்டு பலகம்</h2>
                
                <div class="admin-stats-grid">
                    <div class="admin-stat-card">
                        <div class="admin-stat-icon">🗳️</div>
                        <div class="admin-stat-info">
                            <h3>மொத்த வாக்குகள்</h3>
                            <p class="admin-stat-number">${this.totalVotes}</p>
                        </div>
                    </div>
                    
                    <div class="admin-stat-card">
                        <div class="admin-stat-icon">👥</div>
                        <div class="admin-stat-info">
                            <h3>மொத்த வாக்காளர்கள்</h3>
                            <p class="admin-stat-number">${this.totalVoters}</p>
                        </div>
                    </div>
                    
                    <div class="admin-stat-card">
                        <div class="admin-stat-icon">💡</div>
                        <div class="admin-stat-info">
                            <h3>கோரிக்கைகள்</h3>
                            <p class="admin-stat-number">${this.suggestions.length}</p>
                        </div>
                    </div>
                    
                    <div class="admin-stat-card">
                        <div class="admin-stat-icon">🎯</div>
                        <div class="admin-stat-info">
                            <h3>வாக்கு %</h3>
                            <p class="admin-stat-number">${this.totalVoters ? ((this.totalVotes / this.totalVoters) * 100).toFixed(1) : 0}%</p>
                        </div>
                    </div>
                </div>
                
                <div class="admin-sections">
                    <div class="admin-section">
                        <h3>📊 வாக்கு மேலாண்மை</h3>
                        <div class="admin-actions">
                            <button class="admin-action-btn" onclick="villageEVM.exportVotesCSV()">
                                <span>📥</span> CSV ஏற்றுமதி
                            </button>
                            <button class="admin-action-btn" onclick="villageEVM.exportVotesPDF()">
                                <span>📄</span> PDF ஏற்றுமதி
                            </button>
                            <button class="admin-action-btn danger" onclick="villageEVM.resetVotes()">
                                <span>🔄</span> மீட்டமை
                            </button>
                        </div>
                    </div>
                    
                    <div class="admin-section">
                        <h3>💡 கோரிக்கை மேலாண்மை</h3>
                        <div id="adminSuggestionsList" class="admin-suggestions-list">
                            ${this.renderAdminSuggestions()}
                        </div>
                    </div>
                    
                    <div class="admin-section">
                        <h3>⚙️ அமைப்புகள்</h3>
                        <div class="settings-form">
                            <div class="setting-item">
                                <label>வாக்கு இடைவெளி (வினாடிகள்)</label>
                                <input type="number" id="adminVoteDelay" value="${this.voteDelay/1000}" min="1" max="10">
                            </div>
                            <div class="setting-item">
                                <label>நிர்வாகி மின்னஞ்சல்</label>
                                <input type="email" id="adminEmailSetting" value="${this.adminEmail}">
                            </div>
                            <button class="admin-action-btn" onclick="villageEVM.saveSettings()">
                                <span>💾</span> சேமி
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.showAdminModal(adminDashboard);
    }

    renderAdminSuggestions() {
        if (this.suggestions.length === 0) {
            return '<p class="text-center">📭 கோரிக்கைகள் இல்லை</p>';
        }
        
        return this.suggestions.map(s => `
            <div class="admin-suggestion-item" data-id="${s.id}">
                <div class="admin-suggestion-header">
                    <strong>${this.escapeHtml(s.title)}</strong>
                    <span class="suggestion-date">${s.date}</span>
                </div>
                <div class="admin-suggestion-desc">${this.escapeHtml(s.description)}</div>
                <div class="admin-suggestion-footer">
                    <span>✍️ ${this.escapeHtml(s.author)}</span>
                    <span class="suggestion-status ${s.status}">${s.status === 'pending' ? '⏳ நிலுவையில்' : '✅ பரிசீலனையில்'}</span>
                    <div class="admin-suggestion-actions">
                        <button class="small-btn" onclick="villageEVM.markSuggestionReviewed(${s.id})">✓ முடிந்தது</button>
                        <button class="small-btn danger" onclick="villageEVM.deleteSuggestion(${s.id})">🗑️ நீக்கு</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    markSuggestionReviewed(id) {
        if (!this.isAdmin) return;
        
        const suggestion = this.suggestions.find(s => s.id === id);
        if (suggestion) {
            suggestion.status = 'reviewed';
            this.saveSuggestions();
            this.renderSuggestions();
            this.showAdminDashboard();
            this.showToast('✅ கோரிக்கை பரிசீலனையில்', 'success');
        }
    }

    deleteSuggestion(id) {
        if (!this.isAdmin) return;
        
        if (confirm('⚠️ இந்த கோரிக்கையை நீக்கவா?')) {
            this.suggestions = this.suggestions.filter(s => s.id !== id);
            this.saveSuggestions();
            this.renderSuggestions();
            this.showAdminDashboard();
            this.showToast('🗑️ கோரிக்கை நீக்கப்பட்டது', 'info');
        }
    }

    exportVotesCSV() {
        if (!this.isAdmin) return;
        
        let csv = "Rank,Party,Short Name,Votes,Percentage\n";
        
        const sortedParties = [...this.parties].sort((a, b) => b.votes - a.votes);
        
        sortedParties.forEach((party, index) => {
            const percentage = this.totalVotes > 0 ? ((party.votes / this.totalVotes) * 100).toFixed(1) : 0;
            csv += `${index + 1},${party.name},${party.short},${party.votes},${percentage}%\n`;
        });
        
        csv += `\nTotal Votes,${this.totalVotes}\n`;
        csv += `Total Voters,${this.totalVoters}\n`;
        csv += `Turnout,${this.totalVoters ? ((this.totalVotes / this.totalVoters) * 100).toFixed(1) : 0}%\n`;
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `village_election_results_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        
        this.showToast('📥 CSV பதிவிறக்கம் ஆகிறது', 'success');
    }

    exportVotesPDF() {
        if (!this.isAdmin) return;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Village EVM Results</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #000; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th { background: #000; color: white; padding: 10px; text-align: left; }
                    td { padding: 10px; border-bottom: 1px solid #ddd; }
                    .total { margin-top: 20px; font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>🏡 கிராம வாக்குப்பதிவு 2026 - முடிவுகள்</h1>
                <p>தேதி: ${new Date().toLocaleDateString('ta-IN')}</p>
                <p>கிராமம்: ${this.villageName}</p>
                <p>வாக்குச்சாவடி: ${this.boothNumber}</p>
                <p>மொத்த வாக்காளர்கள்: ${this.totalVoters}</p>
                
                <table>
                    <tr>
                        <th>தரம்</th>
                        <th>கட்சி</th>
                        <th>சின்னம்</th>
                        <th>வாக்குகள்</th>
                        <th>சதவீதம்</th>
                    </tr>
                    ${this.parties.sort((a,b) => b.votes - a.votes).map((p, i) => `
                        <tr>
                            <td>${i+1}</td>
                            <td>${p.short}</td>
                            <td>${p.name.substring(0, 20)}</td>
                            <td>${p.votes}</td>
                            <td>${this.totalVotes > 0 ? ((p.votes / this.totalVotes) * 100).toFixed(1) : 0}%</td>
                        </tr>
                    `).join('')}
                </table>
                
                <div class="total">
                    <p>மொத்த வாக்குகள்: ${this.totalVotes}</p>
                    <p>மொத்த வாக்காளர்கள்: ${this.totalVoters}</p>
                    <p>வாக்கு சதவீதம்: ${this.totalVoters ? ((this.totalVotes / this.totalVoters) * 100).toFixed(1) : 0}%</p>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        
        this.showToast('📄 PDF தயாராகிறது', 'success');
    }

    saveSettings() {
        if (!this.isAdmin) return;
        
        const newDelay = parseInt(document.getElementById('adminVoteDelay').value) * 1000;
        const newEmail = document.getElementById('adminEmailSetting').value.trim();
        
        if (newDelay >= 1000 && newDelay <= 10000) {
            this.voteDelay = newDelay;
            localStorage.setItem('evm_vote_delay', newDelay);
        }
        
        if (newEmail && newEmail.includes('@')) {
            this.adminEmail = newEmail;
            localStorage.setItem('evm_admin_email', newEmail);
        }
        
        this.showToast('✅ அமைப்புகள் சேமிக்கப்பட்டன', 'success');
    }

    showAdminModal(content) {
        const adminModal = document.getElementById('adminModal');
        const adminModalBody = document.getElementById('adminModalBody');
        
        if (adminModal && adminModalBody) {
            adminModalBody.innerHTML = content;
            adminModal.style.display = 'flex';
        }
    }
}

// Create global instance
console.log("🚀 Creating villageEVM instance...");
const villageEVM = new VillageEVM();