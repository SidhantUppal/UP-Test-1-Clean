# Dynamics 365 and social media integration — solution plan

Prepared for Cloud Analogy, for the client conversation that follows the working session on 23 September 2026.
Client context from that session: an organisation in Riyadh, Saudi Arabia, already on Microsoft Dynamics 365, that needs its social channels brought into the CRM.
Engagement shape agreed on the call: white-label project delivery. Cloud Analogy remains the client-facing party. This is a fixed project, not staff augmentation.

## 1. Requirement

Build a controlled bridge between Dynamics 365 and the client’s social platforms so that marketing and sales work from one customer record.

The bridge has to do four things:

1. Bring social insights into Dynamics 365 (leads, and the engagement that can be tied to a person or a campaign).
2. Join those insights to the segments, accounts, and pipeline data that already live in the CRM.
3. Give marketing and sales dashboards they can use for follow-up and for targeted advertising.
4. Keep third-party agencies on the advertising platforms. They do not receive a Dynamics 365 login, a Dataverse connection, or an export of the customer database.

Platforms named on the call, in priority order:

| Priority | Platform | Why it is in scope |
| --- | --- | --- |
| First | Instagram and Facebook (Meta) | Named as the main integration |
| First | TikTok | Named alongside Meta as a major channel |
| Next | LinkedIn | In use; confirm during discovery whether it is lead-gen, advertising, or both |
| Later, if needed | YouTube | Mentioned only as part of the monday.com reference, not as a current client channel |

The behavioural reference from the call is Campaign Bridge on monday.com: a person watches, clicks, or comments, and the sales team sees that inside the CRM and can take the next step. The same outcome is the target here. The mechanism is different, because Dynamics 365 and the social APIs do not work the same way as that monday.com app. Section 4 states what each platform will actually return, so the proposal does not promise a named CRM record for every anonymous view.

## 2. Recommended shape

Two pieces, owned by the client, operated as one solution.

**A bridge outside the CRM.** An Azure integration service holds the social credentials, receives webhooks and scheduled insight pulls, and writes a narrow set of records into Dataverse. Agencies never see this service. The only Dataverse identity it uses is an application user that can create leads and write the social tables, and cannot read the rest of the CRM.

**An app inside Dynamics 365.** A small model-driven app, plus Power BI, for the client’s own marketing and sales users. They see social leads on the normal lead form, engagement on the timeline, and campaign performance next to the segments they already maintain. Security roles decide who sees person-level data and who sees aggregates.

This is the “bridge or an app on Dynamics” choice from the call. Both are required. An app alone cannot collect Meta, LinkedIn, or TikTok data. A bridge alone would leave the sales team outside the CRM, which is the problem Campaign Bridge was built to remove.

Do not start from a third-party social suite installed into the production environment. Microsoft Social Engagement is retired, and a packaged connector would widen access faster than this client wants. Use the native Dynamics pieces that already match the job, and build only the gap.

Use what Microsoft already ships:

- **Lead, Contact, Account, Opportunity** for the sales path.
- **Social Profile** to store a known person’s handle on a channel and link it to a contact.
- **Customer Insights - Journeys**, if the tenant already has it, for LinkedIn lead forms and LinkedIn matched audiences.
- **Customer Insights - Data**, if the tenant already has it, for segment export to Facebook and LinkedIn advertising. Snapchat and Google Ads are available on the same export path if they appear later.
- **Power BI** on Dataverse for the cross-channel dashboard. Customer Insights data can stay inside the Dataverse boundary through the Fabric link rather than being copied out for reporting.

Build, because nothing native covers it:

- Person-level capture from Meta lead forms, permitted comment authors, and messaging, written onto leads.
- Content-level insight (reach, views, clicks, reactions, comments) for Instagram, Facebook, and TikTok.
- The whole TikTok path. Customer Insights does not export audiences to TikTok.
- The agency boundary: a report that can be shared without a CRM user.

## 3. Access model

This is the control that makes the integration acceptable.

| Who | Where they work | What they can see |
| --- | --- | --- |
| Sales | Dynamics 365 | Leads and contacts they are allowed to own, plus the social activity on those records |
| Marketing, inside the client | Dynamics 365 and Power BI | Segments, campaign insight, lead quality, and the customer attributes their role allows |
| Integration service | Azure, application user in Dataverse | Write leads and social-insight rows. No browse access to the customer database |
| Agency media buyers | Meta Business Suite, LinkedIn Campaign Manager, TikTok Ads Manager | Their own ad accounts, plus a client-published performance pack |
| Agency analysts | A separate Power BI app, or a scheduled PDF / Excel pack | Campaign and segment aggregates only. No names, no phones, no emails, no opportunity values, no account financials |

Agencies are not invited to the Dataverse environment. If the client later wants a named agency user, that is a separate decision and a separate security role. It is not part of this design.

Credentials for Meta, LinkedIn, and TikTok belong to the client’s business-manager accounts. They are stored in Azure Key Vault and used only by the integration service. An agency losing access to an ad account does not expose the CRM, and a CRM user cannot export the agency’s ad-account token.

Dataverse controls behind that boundary:

- An application user for the bridge, with a custom security role limited to create and write on Lead and the social tables.
- Field security on national ID, financial fields, and any other sensitive columns already in the CRM, so a marketing role cannot read them even if the form is shared.
- Auditing turned on for the application user and for Lead create.
- The agency Power BI workspace uses a dataset that is aggregated before it is published. Row-level security is a backstop, not the control. The dataset itself does not contain person-level rows.

## 4. What data actually moves

Social platforms do not identify every viewer. The proposal should say that plainly. Promising a contact record for every reel view would fail in discovery.

**Person-level, written to Lead or Contact** when the platform returns an identity the client is allowed to store:

- Lead-form submits (Meta Lead Ads, LinkedIn Lead Gen Forms, TikTok lead generation).
- Comment authors, direct messages, and messaging contacts where the API returns a profile and the client’s consent position allows it.
- Clicks that land on a client site or form and already carry a known identifier (email, phone, or an existing CRM id) plus a campaign parameter.

Each of these creates or updates one lead, stamps the source platform and campaign, and links a Social Profile when a handle is present. Sales follow-up stays in the normal lead process. No new sales process is required for the first release.

**Campaign-level, written as insight rows** when the platform only returns totals:

- Views, reach, impressions, clicks, reactions, comments, and spend, by post or ad and by day.
- These rows attach to a campaign and, where the client already maps campaigns to a segment, to that segment.
- They never create a contact.

Matching a known person to a segment uses the identifiers the CRM already trusts: email, mobile, and an existing customer number on the lead form. If none of those match, the person stays a new lead with a source campaign. They are not forced onto an existing account.

Anonymous performance is still useful for targeting. Marketing can see which campaign and which segment produced pipeline, and Customer Insights can push a segment out as a custom audience. That is the advertising loop, and it does not require the agency to open the CRM.

## 5. Flow

```text
Meta, LinkedIn, TikTok
        │  webhooks for leads and messages
        │  scheduled pull for post and ad insight
        ▼
Azure integration service
  Key Vault for tokens
  normalise, consent-check, match on email / mobile / customer id
        │  application user, write-only
        ▼
Dataverse
  Lead / Contact + Social Profile     (named people)
  Social Insight                      (campaign totals)
  existing segments, accounts, opportunities
        │
        ├── Dynamics app and Power BI     client marketing and sales
        │
        └── aggregated dataset only       agency performance pack

Later, once the inbound path is trusted:
  segment export → Facebook, LinkedIn (native Customer Insights)
                 → TikTok (custom audience file or API)
```

The return path (CRM segment to ad audience) is phase 2 of the build. The first release only brings data in. Turning on audience export before the match rules are agreed would push customer data out to an agency-operated ad account, which is the opposite of the control this design is for.

## 6. Reporting the client can use

Inside the CRM, for client users:

- Social leads awaiting first contact, by platform and campaign.
- Lead to opportunity conversion by platform, so sales can see which channel is worth calling.
- A timeline entry on the lead for the form, comment, or message that created it.

In Power BI, for marketing:

- Reach, clicks, and leads by platform, campaign, and existing segment.
- Spend next to pipeline value where the CRM already stores both.
- Content that produced leads, separate from content that only produced anonymous reach.

For the agency pack:

- The same campaign totals, with segment names only if the client agrees the segment name is not itself sensitive.
- No person-level page, and no path from the report into Dynamics.

## 7. Security, consent, and residency

- Confirm the client’s Saudi Personal Data Protection Law (PDPL) position before any production write. Lead forms collect personal data of people in the Kingdom, and sending that data to a social platform, or storing it outside the Kingdom, needs the client’s own legal view. This solution plan does not make that determination.
- As of this plan, Microsoft’s Saudi Arabia East Azure region is announced for November 2026. It is not a place to deploy today. The current Dynamics 365 geography for a Riyadh tenant is whatever macro-region the tenant is already in (commonly Middle East). Discovery must record that region before the bridge is placed, and the integration service should sit as close to the Dataverse environment as the tenant allows.
- When Saudi Arabia East is actually available for the specific Dynamics and Azure services this design uses, the client can revisit whether the bridge moves. Do not commit a residency promise ahead of that.
- Consent text on lead forms has to match what is stored and who acts on it. The bridge stores only the fields discovery lists.
- Tokens, webhook secrets, and the Dataverse application-user secret live in Key Vault. They are not written into the CRM or into any document shared with the agency.

## 8. How delivery proceeds

The sequence from the call stands: understand the real requirement, confirm the platforms, connect the APIs, land the data in Dynamics 365, and only then touch the live environment.

1. **This document.** Cloud Analogy uses it to show the client the approach. No environment access is required to discuss it.
2. **Discovery call.** The client shows the Dynamics environment, the licenses, and the social accounts. The Dynamics team joins as the CRM specialists. Section 9 is the list to walk through.
3. **Sandbox.** A minimal Dataverse sandbox. One platform first (Meta lead forms plus campaign insight), the application user, one lead form, and one internal dashboard. Nothing is connected to production users.
4. **Prove the boundary.** Demonstrate that an agency identity cannot open the sandbox app, and that the performance pack contains no personal data. This is a test, not a slide.
5. **Widen in the sandbox.** TikTok and LinkedIn, segment matching, and the internal Power BI report.
6. **Production,** only after the sandbox behaviour is accepted. Audience export back to the ad platforms is a separate go-live from the inbound bridge.

Licensing is confirmed in discovery rather than assumed. Sales plus a model-driven app covers the lead path. Customer Insights - Journeys and Customer Insights - Data are used only if the tenant already has them or chooses to add them for LinkedIn forms and audience export. The custom bridge does not depend on Customer Insights for the first release.

## 9. What discovery has to answer

- Which Dynamics 365 apps and licenses are live (Sales, Customer Insights - Journeys, Customer Insights - Data), and which geography the environment is in.
- Whether a sandbox already exists, and who the system administrator is.
- The Meta, LinkedIn, and TikTok business-manager owners, and whether lead forms are already running.
- Which events sales will act on (form, comment, message) and which events are campaign totals only.
- The current segment model: marketing lists, Customer Insights segments, or a custom structure. The bridge joins to that model; it does not invent a second one.
- Which agency works on which platform, and which numbers they are allowed to receive.
- PDPL and consent constraints, including whether any field on today’s forms must not be stored.
- A sample of a good lead and a sample of a campaign report the client already trusts, so the dashboard matches their definitions of lead and of spend.

## 10. Relevant experience

On the call, the Dynamics team described a delivered Dynamics 365 CRM covering an operational process end to end (goods received, labelled, and shipped), together with leads, opportunities, and financial reporting, built over the past year by the same people who would deliver this work.

That is CRM delivery experience on Dynamics 365. It is not a shipped social-media bridge, and it should not be described as one. The social pattern in this plan is the Campaign Bridge outcome Cloud Analogy already knows, rebuilt on Dataverse with an explicit agency boundary. If a written case study is needed for the client pack, the warehouse CRM is the one that can be offered, subject to that client’s permission to be named.

## 11. Next step

Cloud Analogy sends this plan, or a shortened version of sections 1 to 3 and 8, to the client. If the approach is accepted, the next meeting is the discovery call in section 9, with the Dynamics specialists on the call.

Distribution requested on the working session: Vaibhav Sharma, vaibhav.sharma@cloudanalogy.com.
