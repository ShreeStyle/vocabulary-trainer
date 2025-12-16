// Custom Dropdown for 90s Mac OS Look

function initCustomDropdowns() {
    const customSelects = document.querySelectorAll('.custom-select');
    
    customSelects.forEach(function(select) {
        const selectSelected = select.querySelector('.select-selected');
        const selectItems = select.querySelector('.select-items');
        const allOptions = selectItems.querySelectorAll('div');
        const enabledOptions = selectItems.querySelectorAll('div:not(.disabled)');
        const hiddenSelect = select.parentElement.querySelector('select');
        
        // Toggle dropdown
        selectSelected.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAllSelect(select);
            selectItems.classList.toggle('select-hide');
            selectSelected.classList.toggle('select-arrow-active');
        });
        
        // Select option - handle both enabled and disabled
        allOptions.forEach(function(option) {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Don't allow selecting disabled options
                if (this.classList.contains('disabled')) {
                    return;
                }
                
                // Update selected text
                selectSelected.textContent = this.textContent;
                
                // Update hidden select
                hiddenSelect.value = this.getAttribute('data-value');
                
                // Trigger change event for the original select
                const event = new Event('change', { bubbles: true });
                hiddenSelect.dispatchEvent(event);
                
                // Remove previous selection
                const siblings = this.parentElement.querySelectorAll('div');
                siblings.forEach(sib => sib.classList.remove('same-as-selected'));
                
                // Mark as selected
                this.classList.add('same-as-selected');
                
                // Close dropdown
                selectItems.classList.add('select-hide');
                selectSelected.classList.remove('select-arrow-active');
            });
        });
    });
    
    // Close all dropdowns when clicking outside
    document.addEventListener('click', function() {
        closeAllSelect();
    });
}

function closeAllSelect(element) {
    const selectItems = document.querySelectorAll('.select-items');
    const selectSelected = document.querySelectorAll('.select-selected');
    
    selectItems.forEach(function(item, index) {
        if (element && element.querySelector('.select-items') === item) {
            return;
        }
        item.classList.add('select-hide');
        selectSelected[index].classList.remove('select-arrow-active');
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomDropdowns);
} else {
    initCustomDropdowns();
}
