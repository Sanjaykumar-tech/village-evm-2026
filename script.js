// ============================================
// 🏡 TAMIL NADU VILLAGE EVM 2026
// Simple Voting Machine for Village Survey
// Just Click & Vote - No Complicated Process!
// ============================================

class VillageEVM {
    constructor() {
        this.villageName = "குணமங்கலம்";  // Change this to your village name
        this.boothNumber = "TN-15-157-158";      // Change this to your booth number
        this.surveyorName = "குணமங்கலம் TVK";        // Change this to surveyor name
        
         // Tamil Nadu Parties - PNG Symbols
        this.parties = [
            { 
                id: 1, 
                name: "திராவிட முன்னேற்றக் கழகம்", 
                short: "DMK", 
                symbol: '<img src="images/dmk.png" alt="DMK" class="party-symbol-img">',
                alliance: "SECULAR",
                color: "#e31b23",
                votes: 0
            },
            { 
                id: 2, 
                name: "அனைத்திந்திய அண்ணா திராவிட முன்னேற்றக் கழகம்", 
                short: "AIADMK", 
                symbol: '<img src="images/aiadmk.png" alt="AIADMK" class="party-symbol-img">',
                alliance: "NDA",
                color: "#00843D",
                votes: 0
            },
            { 
                id: 3, 
                name: "தமிழக வெற்றி கழகம்", 
                short: "TVK", 
                symbol: '<img src="images/tvk.jpeg" alt="TVK" class="party-symbol-img">',
                alliance: "Others",
                color: "#e31b23",
                votes: 0
            },
            { 
                id: 4, 
                name: "பாரதிய ஜனதா கட்சி", 
                short: "BJP", 
                symbol: '<img src="images/bjp.png" alt="BJP" class="party-symbol-img">',
                alliance: "NDA",
                color: "#FF9933",
                votes: 0
            },
            { 
                id: 5, 
                name: "இந்திய தேசிய காங்கிரஸ்", 
                short: "INC", 
                symbol: '<img src="images/inc.png" alt="INC" class="party-symbol-img">',
                alliance: "SECULAR",
                color: "#00BFFF",
                votes: 0
            },
            { 
                id: 6, 
                name: "நாம் தமிழர் கட்சி", 
                short: "NTK", 
                symbol: '<img src="images/ntk.png" alt="NTK" class="party-symbol-img">',
                alliance: "Others",
                color: "#FFD700",
                votes: 0
            },
            { 
                id: 7, 
                name: "பாட்டாளி மக்கள் கட்சி", 
                short: "PMK", 
                symbol: '<img src="images/pmk.png" alt="PMK" class="party-symbol-img">',
                alliance: "NDA",
                color: "#FFA500",
                votes: 0
            },
            { 
                id: 8, 
                name: "விடுதலை சிறுத்தைகள் கட்சி", 
                short: "VCK", 
                symbol: '<img src="images/vck.jpeg" alt="VCK" class="party-symbol-img">',
                alliance: "SECULAR",
                color: "#800080",
                votes: 0
            },
            { 
                id: 9, 
                name: "தேசிய முற்போக்கு திராவிட கழகம்", 
                short: "DMDK", 
                symbol: '<img src="images/dmdk.jpeg" alt="DMDK" class="party-symbol-img">',
                alliance: "Others",
                color: "#FFD700",
                votes: 0
            },
            { 
                id: 10, 
                name: "மறுமலர்ச்சி திராவிட முன்னேற்றக் கழகம்", 
                short: "MDMK", 
                symbol: '<img src="images/mdmk.png" alt="MDMK" class="party-symbol-img">',
                alliance: "SECULAR",
                color: "#FF0000",
                votes: 0
            },
            { 
                id: 11, 
                name: "மக்கள் நீதி மய்யம்", 
                short: "MNM", 
                symbol: '<img src="images/mnm.png" alt="MNM" class="party-symbol-img">',
                alliance: "Others",
                color: "#FF69B4",
                votes: 0
            },
            { 
                id: 12, 
                name: "இந்திய கம்யூனிஸ்ட் கட்சி (மார்க்சிஸ்ட்)", 
                short: "CPI(M)", 
                symbol: '<img src="images/cpim.png" alt="CPI(M)" class="party-symbol-img">',
                alliance: "Left",
                color: "#FF0000",
                votes: 0
            },
            { 
                id: 13, 
                name: "இந்திய கம்யூனிஸ்ட் கட்சி", 
                short: "CPI", 
                symbol: '<img src="images/cpi.png" alt="CPI" class="party-symbol-img">',
                alliance: "Left",
                color: "#FF0000",
                votes: 0
            },
            { 
                id: 14, 
                name: "இந்திய யூனியன் முஸ்லிம் லீக்", 
                short: "IUML", 
                symbol: '<img src="images/iuml.png" alt="IUML" class="party-symbol-img">',
                alliance: "SECULAR",
                color: "#008000",
                votes: 0
            },
            { 
                id: 15, 
                name: "அம்மா மக்கள் முன்னேற்ற கழகம்", 
                short: "AMMK", 
                symbol: '<img src="images/ammk.png" alt="AMMK" class="party-symbol-img">',
                alliance: "Others",
                color: "#00843D",
                votes: 0
            },
            { 
                id: 16, 
                name: "தமிழ் மாநில காங்கிரஸ்", 
                short: "TMC(M)", 
                symbol: '<img src="images/tmc.png" alt="TMC" class="party-symbol-img">',
                alliance: "SECULAR",
                color: "#00BFFF",
                votes: 0
            },
            { 
                id: 17, 
                name: "புதிய தமிழகம் கட்சி", 
                short: "PT", 
                symbol: '<img src="images/pt.png" alt="PT" class="party-symbol-img">',
                alliance: "Others",
                color: "#FFA500",
                votes: 0
            },
            { 
                id: 19, 
                name: "ஆம் ஆத்மி கட்சி", 
                short: "AAP", 
                symbol: '<img src="images/aap.png" alt="AAP" class="party-symbol-img">',
                alliance: "Others",
                color: "#0000FF",
                votes: 0
            },
            { 
                id: 20, 
                name: "பகுஜன் சமாஜ் கட்சி", 
                short: "BSP", 
                symbol: '<img src="images/bsp.png" alt="BSP" class="party-symbol-img">',
                alliance: "Others",
                color: "#0000FF",
                votes: 0
            },
            { 
                id: 21, 
                name: "நோட்டா", 
                short: "NOTA", 
                symbol: '<img src="images/nota.png" alt="NOTA" class="party-symbol-img">',
                alliance: "Others",
                color: "#000000",
                votes: 0
            }
        ];
        // Village voters list
        this.voters = [
            "Raman", "Selvi", "Murugan", "Anjali", "Kumar", 
            "Lakshmi", "Perumal", "Meena", "Sundar", "Vanitha"
        ];
        
        this.totalVotes = 0;
        this.selectedParty = null;
        this.lastVoteTime = 0;
        this.voteDelay = 2000; // 2 seconds delay (simple)
        this.remainingTime = 0;
        this.timerInterval = null;
        
        // Load saved votes
        this.loadVotes();
        this.init();
    }

    init() {
        // Update village info
        document.getElementById('villageName').textContent = this.villageName;
        document.getElementById('boothNumber').innerHTML = `வாக்குச்சாவடி: ${this.boothNumber}`;
        document.getElementById('surveyorName').innerHTML = `கணக்கெடுப்பாளர்: ${this.surveyorName}`;
        
        this.renderParties();
        this.renderResults();
        this.startTimer();
        this.attachEvents();
    }

    loadVotes() {
        const saved = localStorage.getItem(`villageVotes_${this.villageName}`);
        if (saved) {
            const votes = JSON.parse(saved);
            this.parties = this.parties.map(party => ({
                ...party,
                votes: votes[party.id] || 0
            }));
            this.totalVotes = this.parties.reduce((sum, p) => sum + p.votes, 0);
        }
    }

    saveVotes() {
        const votes = {};
        this.parties.forEach(p => votes[p.id] = p.votes);
        localStorage.setItem(`villageVotes_${this.villageName}`, JSON.stringify(votes));
        localStorage.setItem(`villageTotalVotes_${this.villageName}`, this.totalVotes);
    }

    renderParties() {
        const grid = document.getElementById('partyGrid');
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const allianceFilter = document.getElementById('allianceFilter')?.value || 'all';
        
        let filteredParties = this.parties;
        
        if (searchTerm) {
            filteredParties = filteredParties.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.short.toLowerCase().includes(searchTerm) ||
                p.symbol.includes(searchTerm)
            );
        }
        
        if (allianceFilter !== 'all') {
            filteredParties = filteredParties.filter(p => p.alliance === allianceFilter);
        }
        
        grid.innerHTML = filteredParties.map(party => `
            <button class="party-btn" onclick="villageEVM.selectParty(${party.id})"
                    ${this.remainingTime > 0 ? 'disabled' : ''}>
                <div class="party-symbol">${party.symbol}</div>
                <div class="party-name">${party.short}</div>
                <div class="party-name-tamil">${party.name.substring(0, 20)}...</div>
                <span class="party-alliance">${party.alliance}</span>
                <div class="vote-count" style="color: ${party.color}">
                    ${party.votes} வாக்குகள்
                </div>
            </button>
        `).join('');
        
        document.getElementById('totalVotes').textContent = this.totalVotes;
        document.getElementById('votersCount').textContent = this.voters.length;
        document.getElementById('totalVotesFooter').textContent = this.totalVotes;
    }

    renderResults() {
        const tbody = document.getElementById('resultsBody');
        const sortedParties = this.parties.sort((a, b) => b.votes - a.votes);
        
        tbody.innerHTML = sortedParties.map((party, index) => {
            const percentage = this.totalVotes > 0 
                ? ((party.votes / this.totalVotes) * 100).toFixed(1) 
                : 0;
            
            return `
                <tr>
                    <td><strong>${index + 1}</strong></td>
                    <td style="font-size: 28px;">${party.symbol}</td>
                    <td><strong>${party.short}</strong></td>
                    <td style="color: #666;">${party.name.substring(0, 25)}...</td>
                    <td><strong style="color: ${party.color};">${party.votes}</strong></td>
                    <td>
                        <strong>${percentage}%</strong>
                        <div class="progress-bar" style="margin-top: 5px;">
                            <div class="progress-fill" style="width: ${percentage}%; background: ${party.color};"></div>
                        </div>
                    </td>
                    <td>
                        ${index === 0 && this.totalVotes > 0 ? '🏆 முன்னணி' : ''}
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Replace the selectParty function with this:
selectParty(partyId) {
    if (this.remainingTime > 0) {
        this.showToast(`⏳ ${this.remainingTime} வினாடிகள் காத்திருக்கவும்`, 'warning');
        return;
    }
    
    this.selectedParty = this.parties.find(p => p.id === partyId);
    
    // ✅ FIXED: Image-ஐ சரியா Set பண்ணுது
    document.getElementById('modalPartySymbol').innerHTML = this.selectedParty.symbol;
    document.getElementById('modalPartyName').innerHTML = this.selectedParty.short;
    document.getElementById('modalPartyTamil').innerHTML = this.selectedParty.name;
    document.getElementById('confirmModal').style.display = 'flex';
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
            
            // Add vote
            this.selectedParty.votes += 1;
            this.totalVotes++;
            this.lastVoteTime = now;
            
            // Save to localStorage
            this.saveVotes();
            
            // Update UI
            this.renderParties();
            this.renderResults();
            
            // Show success message
            this.showToast(`✅ ${this.selectedParty.short} - வாக்கு பதிவானது!`, 'success');
            
            // Close modal
            document.getElementById('confirmModal').style.display = 'none';
            this.selectedParty = null;
            
            // Start timer
            this.remainingTime = 2; // 2 seconds
        }
    }

    cancelVote() {
        document.getElementById('confirmModal').style.display = 'none';
        this.selectedParty = null;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.lastVoteTime > 0) {
                const elapsed = Date.now() - this.lastVoteTime;
                this.remainingTime = Math.max(0, 2 - Math.floor(elapsed / 1000));
                
                const timerDisplay = document.getElementById('timerDisplay');
                const timerValue = document.getElementById('timerValue');
                
                if (this.remainingTime > 0) {
                    timerDisplay.style.display = 'flex';
                    timerValue.textContent = this.remainingTime;
                } else {
                    timerDisplay.style.display = 'none';
                }
                
                this.renderParties();
            }
        }, 100);
    }

    resetVotes() {
        if (confirm('⚠️ நிச்சயமாக அனைத்து வாக்குகளையும் மீட்டமைக்க விரும்புகிறீர்களா?')) {
            this.parties.forEach(party => party.votes = 0);
            this.totalVotes = 0;
            this.lastVoteTime = 0;
            this.remainingTime = 0;
            this.saveVotes();
            this.renderParties();
            this.renderResults();
            this.showToast('🔄 அனைத்து வாக்குகளும் மீட்டமைக்கப்பட்டன', 'success');
            
            // Hide timer
            document.getElementById('timerDisplay').style.display = 'none';
        }
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2000);
    }

    attachEvents() {
        // Search
        document.getElementById('searchInput').addEventListener('input', () => this.renderParties());
        document.getElementById('allianceFilter').addEventListener('change', () => this.renderParties());
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('confirmModal')) {
                this.cancelVote();
            }
        });
        
        // Keyboard support
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.cancelVote();
            }
        });
    }
}

// Initialize Village EVM
const villageEVM = new VillageEVM();


