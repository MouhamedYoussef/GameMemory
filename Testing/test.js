function testStartButton() {
    const startBtn = document.getElementById('btn-start')
    const levelText = document.getElementById('level-display')
    
    startBtn.click()
    
    setTimeout(function() {
        if (levelText.textContent === 'Level 1') {
            console.log('START BUTTON TEST: PASS')
        } else {
            console.log('START BUTTON TEST: FAIL')
        }
    }, 1000)
}

function testModal() {
    const howToPlay = document.getElementById('btn-how-to-play')
    const modal = document.getElementById('modal')
    const closeBtn = document.getElementById('close-modal')
    
    howToPlay.click()
    
    if (modal.classList.contains('hidden')) {
        console.log('MODAL OPEN TEST: FAIL')
    } else {
        console.log('MODAL OPEN TEST: PASS')
    }
    
    closeBtn.click()
    
    setTimeout(function() {
        if (modal.classList.contains('hidden')) {
            console.log('MODAL CLOSE TEST: PASS')
        } else {
            console.log('MODAL CLOSE TEST: FAIL')
        }
    }, 100)
}
function testRestartButton() {
    const startBtn = document.getElementById('btn-start')
    
    startBtn.click()
    
    setTimeout(function() {
        if (startBtn.textContent === 'Restart Game') {
            console.log('RESTART BUTTON TEST: PASS')
        } else {
            console.log('RESTART BUTTON TEST: FAIL')
        }
    }, 500)
}

function testStatusMessage() {
    const startBtn = document.getElementById('btn-start')
    const statusMsg = document.getElementById('status-message')
    
    startBtn.click()
    
    setTimeout(function() {
        if (statusMsg.textContent.includes('Watch')) {
            console.log('STATUS MESSAGE TEST: PASS')
        } else {
            console.log('STATUS MESSAGE TEST: FAIL')
        }
    }, 600)
}

function testGameReset() {
    const startBtn = document.getElementById('btn-start')
    const levelText = document.getElementById('level-display')
    
    startBtn.click()
    
    setTimeout(function() {
        startBtn.click()
        
        setTimeout(function() {
            if (levelText.textContent === 'Level 1') {
                console.log('GAME RESET TEST: PASS')
            } else {
                console.log('GAME RESET TEST: FAIL')
            }
        }, 1000)
    }, 1000)
}



function runAllTests() {
    console.log('Run tests')
    testModal()
    testStartButton()
    testRestartButton()
    testStatusMessage()
    testGameReset()
}

runAllTests()