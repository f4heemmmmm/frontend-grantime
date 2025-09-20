export const mockResponse = {
    decision: "NO",
    confidence: 95,
    reasoning: `Shelter setup and operations are not permitted under Healthcare Foundation's grant restrictions. The Healthcare Foundation grant agreement specifically limits funding to medical supplies and healthcare services only.`,
    fundSource: null,
    citations: [
        {
            text: "Grantee funds shall be used exclusively for educational programming and direct client services as defined in Exhibit A. Emergency facility operations, including but not limited to utilities, maintenance, and crisis response activities, are specifically excluded from allowable expenses under this agreement.",
            source: "Grant Agreement HCF-2024-089",
            section: "Section 3.2 - Allowable Expenses",
            clickable: true
        }
    ],
    alternatives: [
        {
            donor: "Emergency Relief Grant",
            available: 75000,
            amount: 200000,
            reasoning: "This grant specifically covers emergency shelter operations and setup costs.",
            citations: [
                {
                    text: "Funds may be utilized for emergency shelter establishment, including temporary housing setup, basic utilities connection, and emergency accommodation services for displaced individuals during crisis periods.",
                    source: "Grant Agreement ERG-2023-156",
                    section: "Section 2.3 - Emergency Housing Provisions",
                    clickable: true
                }
            ]
        },
        {
            donor: "Community Support Fund", 
            available: 28000,
            amount: 75000,
            reasoning: "Covers housing and shelter programs with specific provisions for emergency shelter setup.",
            citations: [
                {
                    text: "Grant recipients are authorized to establish temporary and emergency shelters, including facility preparation, basic infrastructure setup, and operational costs not exceeding reasonable community standards for emergency housing.",
                    source: "Grant Agreement CSF-2024-022",
                    section: "Section 4.1 - Housing and Shelter Programs",
                    clickable: true
                }
            ]
        }
    ],
    processingNote: "Emergency Relief Grant funds can be accessed immediately upon submission of Form ER-401. Community Support Fund requires 48-hour approval process.",
    allowedUses: "Healthcare Foundation funds CAN be used for:\n• Emergency medical supplies\n• Healthcare equipment\n• Medical training programs\n• Patient care services\n• Health education initiatives",
    prohibitedUses: "Healthcare Foundation funds CANNOT be used for:\n• Shelter operations\n• Utilities\n• Facility maintenance\n• Construction\n• Administrative salaries\n• Office supplies\n• Any non-medical emergency response activities",
    showChangeAgreementButton: true,
    showSubmitRequestButton: false
};