/** @jsx jsx */
import { jsx, Styled, Box } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Grid } from '@theme-ui/components'

import Layout from '../components/Layout'
import Stats from '../components/Stats'
import Button from '../components/Button'
import Section from '../components/Section'
import Divider from '../components/Divider'
import categories from '../data/categories.json'

const Index = ({ data }) => {
  const stats = [
    { title: 'Projects', value: '150' },
    { title: 'Registry Value (ETH)', value: '150,000' },
    { title: 'Issued Shares', value: '350' }
  ]

  const challengedProjects = data.everest.projects.filter(
    project => project.isChallenged === true
  )

  return (
    <Layout>
      <Grid gap={[2, 2, 6]} columns={[1, null, 2]}>
        <Box>
          <Styled.h1>
            Universally <br />
            shared <span sx={{ color: 'secondary' }}>projects</span> registry
          </Styled.h1>
          <Styled.h6 sx={{ marginTop: 4 }}>
            Every project starts with a mission. Our mission is to catalyze the
            shift to Web3 by creating the first decentralized registry to
            provide ongoing utility to the crypto community.
          </Styled.h6>
          <Grid columns={['max-content', 1]} mt={[2, 2, 5]} mb={[2, 2, 5]}>
            <Button to="/project/new" text="Add a project" variant="primary" />
          </Grid>
        </Box>
        <Box
          sx={{
            ...imageStyles,
            backgroundImage: 'url(./mountain.png)'
          }}
        />
      </Grid>
      <Grid sx={{ maxWidth: '1100px' }} mx="auto" my={6}>
        <Stats stats={stats} />
      </Grid>
      <Divider />
      <Section
        title="Categories"
        description="All projects belong to at least one category. Categories are also
      curated in a decentralized way."
        items={categories.slice(0, 10).map(category => {
          return {
            name: category.name,
            description: '24 projects',
            image: `/categories/${category.slug}.png`,
            to: `/category/${category.slug}`
          }
        })}
        linkTo="/categories"
        linkText="View all Categories"
        variant="category"
      />
      <Section
        title="Recent Projects"
        description="These projects were recently added by members of the community."
        items={data.everest.projects.map(project => {
          return {
            name: project.name,
            description: project.description.slice(0, 20) + '...',
            to: `/project/${project.id}`,
            image: project.image
          }
        })}
        linkTo="/projects"
        linkText="View all Projects"
        variant="project"
      />
      <Divider />
      <Grid
        columns={[1, 2, 2]}
        gap={[1, 2, 6]}
        sx={{ alignItems: 'center', mb: [5, 7, 7] }}
      >
        <Box
          sx={{
            ...imageStyles,
            height: '246px',
            backgroundSize: 'contain',
            backgroundImage: 'url(./binoculars.png)',
            filter: 'none',
            boxShadow: 'none'
          }}
        />
        <Box>
          <Styled.h4>Why curation</Styled.h4>
          <Styled.p sx={{ lineHeight: '1.5rem', mt: 4 }}>
            Everest is building toward a decentralized future where no
            privileged group has control over public data. Curation allows
            diverse stakeholders to agree on the contents of a shared registry
            with neutrality.
            <br />
            <br />
            To add a project to the registry you must submit a $10 listing fee
            paid in ETH. The listing fee helps ensure the list's quality.
            <br />
            <br /> Anyone can challenge a listing by putting ETH at stake. With
            these tools we can build consensus on a shared registry without
            giving anyone control over the data. Let the decentralized future
            begin!
          </Styled.p>
        </Box>
      </Grid>
      <Section
        title="Active Challenges"
        description="These projects were recently challanged by members of
        the community."
        items={challengedProjects.map(project => {
          return {
            name: project.name,
            description: project.description.slice(0, 20) + '...',
            to: `/project/${project.id}`,
            image: project.image
          }
        })}
        linkTo="/projects"
        linkText="View all Challenges"
        variant="project"
      />
      <Divider />
      <Grid gap={[2, 6, 8]} columns={[1, 2, 2]} mt={[2, 7]}>
        <Box
          sx={{
            ...imageStyles,
            backgroundImage: 'url(./bottom.png)'
          }}
        />
        <Box sx={{ maxWidth: '396px' }}>
          <Styled.h4>Be part of conquering Everest!</Styled.h4>
          <Styled.p sx={{ marginTop: 4, lineHeight: '1.5rem' }}>
            Having a complete and up-to-date list of projects is a major
            achievement on the road to decentralization.
          </Styled.p>
          <Grid columns={['max-content', 1]} mt={[2, 2, 5]} mb={[2, 2, 5]}>
            <Button to="/project/new" text="Add a project" variant="primary" />
          </Grid>
        </Box>
      </Grid>
    </Layout>
  )
}

const imageStyles = {
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 50%',
  backgroundSize: 'cover',
  width: '100%',
  height: ['280px', '344px'],
  position: 'relative',
  filter: 'drop-shadow(24px 24px 24px rgba(9,6,16,0.5))',
  boxShadow: '24px 24px 24px rgba(76,102,255,0.12)'
}

Index.propTypes = {
  data: PropTypes.object.isRequired
}

export default Index

export const query = graphql`
  query everest {
    everest {
      projects {
        id
        name
        description
        isChallenged
        image
        owner {
          id
          name
        }
      }
    }
  }
`
