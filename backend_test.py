import requests
import sys
from datetime import datetime
import json

class RealEstateAPITester:
    def __init__(self, base_url="https://real-master-consult.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": None,
                "error": None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result["response_data"] = response.json()
                    print(f"   Response: {json.dumps(result['response_data'], indent=2)}")
                except:
                    result["response_data"] = response.text
                    print(f"   Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result["error"] = error_data
                    print(f"   Error: {json.dumps(error_data, indent=2)}")
                except:
                    result["error"] = response.text
                    print(f"   Error: {response.text}")

            self.test_results.append(result)
            return success, result["response_data"] if success else result["error"]

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.test_results.append(result)
            return False, str(e)

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )
        return success

    def test_create_lead(self, name, email, phone):
        """Test lead creation"""
        success, response = self.run_test(
            "Create Lead",
            "POST",
            "api/leads",
            200,
            data={"name": name, "email": email, "phone": phone}
        )
        return response.get('id') if success and isinstance(response, dict) else None

    def test_get_leads(self):
        """Test getting all leads"""
        success, response = self.run_test(
            "Get All Leads",
            "GET",
            "api/leads",
            200
        )
        return success, response

    def test_form_validation(self):
        """Test form validation with missing fields"""
        print("\n🔍 Testing Form Validation...")
        
        # Test missing name
        success, _ = self.run_test(
            "Missing Name Validation",
            "POST",
            "api/leads",
            422,  # FastAPI returns 422 for validation errors
            data={"email": "test@example.com", "phone": "1234567890"}
        )
        
        # Test missing email
        success, _ = self.run_test(
            "Missing Email Validation", 
            "POST",
            "api/leads",
            422,
            data={"name": "Test User", "phone": "1234567890"}
        )
        
        # Test missing phone
        success, _ = self.run_test(
            "Missing Phone Validation",
            "POST", 
            "api/leads",
            422,
            data={"name": "Test User", "email": "test@example.com"}
        )

def main():
    print("🚀 Starting Real Estate API Testing...")
    print("=" * 50)
    
    # Setup
    tester = RealEstateAPITester()
    timestamp = datetime.now().strftime('%H%M%S')
    test_name = f"test_user_{timestamp}"
    test_email = f"test_{timestamp}@example.com"
    test_phone = f"98765{timestamp[-5:]}"

    # Run tests
    print("\n📋 Test Plan:")
    print("1. Test root API endpoint")
    print("2. Test lead creation")
    print("3. Test lead retrieval")
    print("4. Test form validation")
    
    # Test 1: Root endpoint
    if not tester.test_root_endpoint():
        print("❌ Root API failed, but continuing with other tests...")

    # Test 2: Create lead
    lead_id = tester.test_create_lead(test_name, test_email, test_phone)
    if not lead_id:
        print("❌ Lead creation failed, but continuing with other tests...")

    # Test 3: Get leads
    success, leads_data = tester.test_get_leads()
    if success and isinstance(leads_data, list):
        print(f"✅ Retrieved {len(leads_data)} leads from database")
        if lead_id and any(lead.get('id') == lead_id for lead in leads_data):
            print(f"✅ Created lead found in database")
        else:
            print(f"⚠️  Created lead not found in database (may be expected)")
    else:
        print("❌ Failed to retrieve leads")

    # Test 4: Form validation
    tester.test_form_validation()

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        
        # Print failed tests summary
        failed_tests = [test for test in tester.test_results if not test["success"]]
        if failed_tests:
            print("\n❌ Failed Tests:")
            for test in failed_tests:
                print(f"   - {test['test_name']}: {test['actual_status']} (expected {test['expected_status']})")
        
        return 1

if __name__ == "__main__":
    sys.exit(main())