export const mockResponse2 = {
    decision: null,
    confidence: null,
    reasoning: `Research and development for substance abuse programs is permitted under multiple grant agreements. Both the Mental Health Research Foundation and Addiction Recovery Initiative grants specifically allow funding for R&D activities in substance abuse treatment and prevention.`,
    fundSource: {
        donor: "Mental Health Research Foundation",
        available: 45000,
        amount: 120000
    },
    citations: [
        {
            text: "Grant funds may be allocated toward research initiatives, program development, and evidence-based treatment methodology advancement in the fields of mental health and substance abuse recovery.",
            source: "Grant Agreement MHRF-2024-067",
            section: "Section 2.4 - Research and Development Activities",
            clickable: true
        }
    ],
    alternatives: [
        {
            donor: "Mental Health Research Foundation",
            available: 45000,
            amount: 120000,
            reasoning: "Primary recommended source with substantial available funds specifically designated for substance abuse research and program development.",
            citations: [
                {
                    text: "Eligible expenses include research project costs, data collection activities, pilot program development, treatment protocol research, and innovative intervention methodology studies focused on substance abuse and addiction recovery.",
                    source: "Grant Agreement MHRF-2024-067",
                    section: "Section 3.1 - Eligible Research Expenses",
                    clickable: true
                }
            ],
            showSubmitRequestButton: true
        },
        {
            donor: "Addiction Recovery Initiative", 
            available: 18500,
            amount: 50000,
            reasoning: "Secondary option with dedicated funding for addiction research, including development of new treatment approaches and evidence-based interventions.",
            citations: [
                {
                    text: "Funds shall support research and development activities aimed at improving substance abuse treatment outcomes, including but not limited to clinical studies, program evaluation research, and development of innovative therapeutic approaches.",
                    source: "Grant Agreement ARI-2023-194",
                    section: "Section 4.2 - Research Program Support",
                    clickable: true
                }
            ],
            showSubmitRequestButton: true
        }
    ],
    processingNote: "Mental Health Research Foundation requires submission of research proposal and IRB approval. Addiction Recovery Initiative funds can be accessed with simplified Form ARI-203.",
    allowedUses: "Research and Development funds CAN be used for:\n•    Clinical research studies\n•    Treatment methodology development\n•    Data collection and analysis\n•    Pilot program implementation\n•    Evidence-based intervention research\n•    Program evaluation studies\n•    Research equipment and materials",
    prohibitedUses: "Research and Development funds CANNOT be used for:\n•    Direct patient treatment costs\n•    Facility operational expenses\n•    Administrative overhead exceeding 15%\n•    Equipment not directly related to research\n•    Travel expenses exceeding $500 per study\n•    Commercial product development\n•    Research unrelated to substance abuse",
    showChangeAgreementButton: false,
    showSubmitRequestButton: true
};