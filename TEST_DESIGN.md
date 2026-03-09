# Test Design Explanation

## Implemented Scenarios

### API Tests (Petstore)
| Scenario | Type | Description | Coverage |
|----------|------|-------------|----------|
| Create pet successfully | Positive | Valid pet creation with name "Buddy" and status "available" | Core CRUD operation |
| Create pet with empty name | Negative | Tests API validation (returns 200 - API accepts empty names) | Input validation |
| Find pets by status | Positive | Data-driven test for available/pending/sold status | Query parameters, response structure |

### UI Tests (Sauce Demo)
| Scenario | Type | Description | Coverage |
|----------|------|-------------|----------|
| Login with all valid users | Positive | Tests all 6 accepted usernames (standard, problem, performance_glitch, error, visual) | Complete user coverage |
| Login with locked out user | Negative | Verifies locked_out_user receives correct error message | Business rule validation |
| Login with invalid credentials | Negative | Data-driven test for wrong password, empty username, empty password | Input validation |
| Add item to basket | Positive | End-to-end flow: view product, check price, add to cart, verify in cart | User journey, data consistency |


## Additional Test Scenarios (Priority Order)

### API Tests - Petstore

| Priority | Scenario | Approach | Rationale |
|----------|----------|----------|-----------|
| HIGH | Update existing pet (PUT /pet) | Create a pet, then update its name/status, verify changes with GET | Tests full CRUD cycle, ensures data persistence - core functionality |
| HIGH | Delete pet (DELETE /pet/{petId}) | Create pet, delete it, verify with GET returns 404 | Tests resource lifecycle and cleanup - essential for data management |
| MEDIUM | Get pet by invalid ID (GET /pet/0) | Test with non-existent ID, verify 404 response and error message | Error handling for invalid inputs - important for robustness |
| MEDIUM | Find pets by invalid status | Test with invalid status value, verify error response | Input validation for query parameters |
| LOW | Upload pet image (POST /pet/{petId}/uploadImage) | Test form upload with valid/invalid image formats | Edge case - file upload functionality |

### UI Tests - Sauce Demo

| Priority | Scenario | Approach | Rationale |
|----------|----------|----------|-----------|
| HIGHEST | Complete checkout flow | Add item → cart → checkout form (first name, last name, postal code) → finish → verify success message | Tests critical revenue-generating path - business critical |
| HIGH | Remove item from cart | Add item, remove it, verify cart badge updates and cart is empty | Tests cart management functionality - core feature |
| HIGH | Product sorting | Test A-Z, Z-A, price low-high, price high-low, verify order | Tests UX functionality, data sorting - important for user experience |
| MEDIUM | Logout functionality | Login, logout via menu, verify redirect to login page | Tests session management - security related |
| MEDIUM | Product details page | Click product image/name, verify details page matches inventory data | Tests navigation and data consistency |
| LOW | Social media links | Click Twitter/Facebook/LinkedIn links, verify new tab opens | Edge case - external links |

## API vs UI Testing Rationale

### When to Test at API Layer

| Test Type | Example | Why API is Better |
|-----------|---------|-------------------|
| **Data validation** | Creating a pet with empty name | Faster execution, no UI dependencies, easier assertions |
| **Business logic** | Finding pets by status | Isolated testing, reliable, quick feedback (milliseconds vs seconds) |
| **Error handling** | Invalid ID returns 404 | Can easily simulate edge cases, verify exact error codes |
| **CRUD operations** | Create, read, update, delete | Tests core functionality without UI overhead |

### When to Test at UI Layer

| Test Type | Example | Why UI is Necessary |
|-----------|---------|---------------------|
| **User journeys** | Adding item to cart, checkout flow | Test actual user experience and workflow |
| **Visual validation** | Cart badge updates, button states | Can't verify UI rendering at API layer |
| **Cross-browser** | Login works in Chrome, Firefox, Safari | Different browser behaviors only visible in UI |
| **End-to-end flows** | Complete purchase journey | Validates integration between all layers |
