// Custom Multi-select Tag Logic
class TagSelect {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.box = wrapper.querySelector('.tag-select-box');
        this.grid = wrapper.querySelector('.checkbox-grid');
        this.checkboxes = this.grid.querySelectorAll('input[type="checkbox"]');
        this.placeholder = this.box.querySelector('.tag-select-placeholder');
        this.dropdown = null;
        this.selectedValues = new Set();

        this.init();
    }

    init() {
        // Create Dropdown
        this.dropdown = document.createElement('div');
        this.dropdown.className = 'tag-select-dropdown';

        this.checkboxes.forEach(cb => {
            const option = document.createElement('div');
            option.className = 'tag-option';
            option.textContent = cb.parentElement.textContent.trim();
            option.dataset.value = cb.value;

            option.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleOption(cb, option);
            });

            this.dropdown.appendChild(option);

            // Sync initial state if any
            if (cb.checked) {
                this.addTag(cb.value, option.textContent);
                option.classList.add('selected');
                this.selectedValues.add(cb.value);
            }
        });

        this.wrapper.appendChild(this.dropdown);

        // Box Click
        this.box.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            this.dropdown.classList.remove('active');
        });
    }

    toggleDropdown() {
        // Close all other dropdowns first
        document.querySelectorAll('.tag-select-dropdown').forEach(d => {
            if (d !== this.dropdown) d.classList.remove('active');
        });
        this.dropdown.classList.toggle('active');
    }

    toggleOption(checkbox, optionElement) {
        const isSelected = this.selectedValues.has(checkbox.value);

        if (isSelected) {
            this.removeTag(checkbox.value);
            optionElement.classList.remove('selected');
            checkbox.checked = false;
            this.selectedValues.delete(checkbox.value);
        } else {
            this.addTag(checkbox.value, optionElement.textContent);
            optionElement.classList.add('selected');
            checkbox.checked = true;
            this.selectedValues.add(checkbox.value);
        }

        this.updatePlaceholder();
    }

    addTag(value, text) {
        const tag = document.createElement('span');
        tag.className = 'tag-badge';
        tag.dataset.value = value;
        tag.innerHTML = `${text} <span class="remove-tag">&times;</span>`;

        tag.querySelector('.remove-tag').addEventListener('click', (e) => {
            e.stopPropagation();
            const option = Array.from(this.dropdown.querySelectorAll('.tag-option'))
                .find(opt => opt.dataset.value === value);
            const checkbox = Array.from(this.checkboxes)
                .find(cb => cb.value === value);
            this.toggleOption(checkbox, option);
        });

        this.box.appendChild(tag);
    }

    removeTag(value) {
        const tag = this.box.querySelector(`.tag-badge[data-value="${CSS.escape(value)}"]`);
        if (tag) tag.remove();
    }

    updatePlaceholder() {
        if (this.selectedValues.size > 0) {
            this.placeholder.style.display = 'none';
        } else {
            this.placeholder.style.display = 'block';
        }
    }
}

// Demographic Validation Logic
class DemographicValidator {
    constructor(section) {
        this.section = section;
        this.inputs = section.querySelectorAll('input[type="number"]');
        this.totalDisplay = section.querySelector('#demographic-total');
        this.errorDisplay = section.querySelector('#demographic-error');
        this.form = section.closest('form');

        this.init();
    }

    init() {
        this.inputs.forEach(input => {
            input.addEventListener('input', () => this.validate());
        });

        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                const total = this.calculateTotal();
                if (total !== 100) {
                    e.preventDefault();
                    this.errorDisplay.style.display = 'block';
                    this.section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }
    }

    calculateTotal() {
        let sum = 0;
        this.inputs.forEach(input => {
            sum += parseInt(input.value) || 0;
        });
        return sum;
    }

    validate() {
        const total = this.calculateTotal();
        this.totalDisplay.textContent = `Total: ${total}%`;

        if (total === 100) {
            this.totalDisplay.className = 'total-valid';
            this.errorDisplay.style.display = 'none';
        } else {
            this.totalDisplay.className = 'total-invalid';
        }
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    // Multi-selects
    const wrappers = document.querySelectorAll('.tag-select-wrapper');
    wrappers.forEach(wrapper => new TagSelect(wrapper));

    // Demographics
    const demoSection = document.querySelector('#demographics-section');
    if (demoSection) new DemographicValidator(demoSection);
});
