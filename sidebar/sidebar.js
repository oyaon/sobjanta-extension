// Sidebar logic skeleton
// Will later receive messages from popup or background script to populate UI

document.addEventListener('DOMContentLoaded', () => {
    console.log('SobJanta Sidebar loaded and ready for interaction');

    // Future implementation will likely hook into chrome message listeners:
    // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => { ... });
});

export function updateSidebarContent(data) {
    if (data.topic) {
        document.getElementById('topicContent').textContent = data.topic;
    }
    if (data.summary) {
        document.getElementById('summaryContent').textContent = data.summary;
    }
    if (data.key_points && Array.isArray(data.key_points)) {
        const list = document.getElementById('keyPointsList');
        list.innerHTML = '';
        data.key_points.forEach(point => {
            const li = document.createElement('li');
            li.textContent = point;
            list.appendChild(li);
        });
    }
}
